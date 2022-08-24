// import component
import React, { Component } from 'react';
import MultiSelect from 'react-native-multiple-select';

import { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView, TouchableOpacity } from "react-native";
import Navbar from "./../../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Button } from "@rneui/themed";
import { Input } from 'react-native-elements';
// import { FloatingLabelInput } from 'react-native-floating-label-input';


const SymptosForm = ({ navigation }) => {

  let [selectedItems, setselectedItems] = useState([])
  let [items , setitems] = useState([])

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
      {/* <FloatingLabelInput
        label={'label'}
        // value={cont}
        // onChangeText={value => setCont(value)}
      /> */}
        <Text style={styles.textLabel}>    ওজন: </Text>
        <Input/>
        <Text style={styles.textLabel}>    উচ্চতা: </Text>
        <Input/>

        <Text style={styles.textLabel}>    তাপমাত্রা: </Text>
        <Input/>

        <Text style={styles.textLabel}>    রক্তচাপ: </Text>
        <Input/>
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
          // hideSubmitButton = {true}
          styleListContainer={{height: 256}}
          // submitButtonColor="#0c6efc"
          // submitButtonText="সাবমিট"
        />
      </View>
        
      <View>
      

      <View style={{ flex: 1, margin: 10 }}>
          {ref && ref.current && ref.current.getSelectedItemsExt(selectedItems)}
        </View>

      <TouchableOpacity style={styles.loginBtn}>
                        <Text style={styles.loginText}>সাবমিট করুন</Text>
                    </TouchableOpacity>

      </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({

  submitButton: {
    position: 'absolute',
    bottom:0,
    left:0,
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
    marginTop: "10%",
    marginLeft: "10%",
    marginBottom: "10%",
    backgroundColor: "#0c6efc",
},
loginText: {
    color: "white"
},

});

export default SymptosForm;
