import React, { Component } from 'react';
import MultiSelect from 'react-native-multiple-select';

import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView, TouchableOpacity } from "react-native";
import Navbar from "./../../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';


const SymptosForm = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  let [selectedItems, setselectedItems] = useState([])
  let [items, setitems] = useState([])

  useEffect(() => {
    getContents()
  }, [])

  let getContents = async () => {
    let sup_id = await AsyncStorage.getItem('sup_id');
    sup_id = JSON.parse(sup_id)

    let tok = await AsyncStorage.getItem('token')
    tok = JSON.parse(tok)

    console.log(tok)
    let response = await fetch(global.ip + '/chw/symptomsList', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + tok
      },
      body: JSON.stringify(sup_id)
    })
    let d = await response.json()
    // console.log(d)
    for (let i = 0; i < d.list.length; i++) {
      let now = d.list[i]
      let id = i.toString()
      let name = now
      setitems(prevArray => [...prevArray, { id: id, name: name }]);
      // console.log(now)
    }

    console.log("etuku")
    // console.log(items)
  }
  let onSelectedItemsChange = (sItems) => {
    console.log("here")
    setselectedItems([])
    for (let i = 0; i < sItems.length; i++) {
      let id = sItems[i]
      setselectedItems(prevArray => [...prevArray, id])
    }
  };

  const ref = useRef(null)


  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>ভিজিট ফর্ম</Text>
      </View>
      <View style={styles.text2}>
        <Text style={styles.text}>   রোগীর নাম: </Text>
      </View>

      <View style={styles.text2}>
        <Text style={styles.text}>   তারিখ:  {new Date().toDateString()} </Text>
      </View>


      <ScrollView>

        <View style={styles.text2}>
          <Text style={styles.textLabel}>    ওজন: </Text>
          <Input />
        </View>

        <View style={styles.text2}>
          <Text style={styles.textLabel}>    উচ্চতা: </Text>
          <Input />
        </View>

        <View style={styles.text2}>
          <Text style={styles.textLabel}>    তাপমাত্রা: </Text>
          <Input />
        </View>

        <View style={styles.text2}>
          <Text style={styles.textLabel}>    রক্তচাপ: </Text>
          <Input />
        </View>

        <View>
          <MultiSelect
            hideTags
            items={items}
            uniqueKey="id"
            ref={ref}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            selectText=" লক্ষণ সিলেক্ট করুন"
            searchInputPlaceholderText="লক্ষণ খুঁজুন"
            onChangeInput={(text) => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#000" }}
            styleMainWrapper={{ padding: 10 }}
            tagContainerStyle={{ backgroundColor: "#000" }}
            hideSubmitButton={true}
            styleListContainer={{ height: 256 }}
          // submitButtonColor="#0c6efc"
          // submitButtonText="সাবমিট"
          />
        </View>

        <View>


          <View style={{ flex: 1, margin: 10 }}>
            {ref && ref.current && ref.current.getSelectedItemsExt(selectedItems)}
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>প্রেডিকশন দেখুন</Text>
          </TouchableOpacity>

          <View style={styles.text2}>
            <Text style={styles.textLabel}>    পরবর্তী ভিজিট এর তারিখ: </Text>
            <DatePicker
              style={styles.datePickerStyle}
              date={date}
              mode="date"
              placeholder="select date"
              format="DD/MM/YYYY"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {



                },
                dateInput: {
                  borderColor: "gray",
                  alignItems: "center",
                  borderWidth: 0,
                  borderBottomWidth: 1,
                  marginLeft: 10,
                },
                dateText: {
                  fontSize: 17,
                }
              }}
              onDateChange={(date) => {
                setDate(date);
              }}
            />
          </View>

          <View style={styles.text2}>
            <Text style={styles.textLabel}>    পরামর্শ: </Text>
            <Input
              multiline={true}
              numberOfLines={3} />
          </View>

          <View style={styles.text2}>
            <Text style={styles.textLabel}>    সামারি: </Text>
            <Input
              multiline={true}
              numberOfLines={3} />
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>সংরক্ষণ করুন</Text>
          </TouchableOpacity>


        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({

  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#41cca6"
  },

  posts: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    padding: 10,
  },

  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 0,
    alignItems: "center",
    justifyContent: 'space-between'
  },

  title: {
    fontWeight: "bold",
    marginVertical: 4,
    fontSize: 20,
  },

  text: {
    fontWeight: "bold",
    backgroundColor: "#2089dc",
    color: "white",
    // textAlign : "center",
    paddingVertical: 5,
    borderRadius: 10
  },

  text2: {
    backgroundColor: "#2089dc",
    paddingVertical: 0,
    borderRadius: 10,
    margin: 5
  },

  textLabel: {
    fontWeight: "bold",
    color: "white",
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "3%",
    marginLeft: "10%",
    marginBottom: "3%",
    backgroundColor: "#0c6efc",
  },
  loginText: {
    color: "white"
  },
  datePickerStyle: {
    // width: 230,
    width: "100%",
  },

});

export default SymptosForm;
