// import component
import React, { Component } from 'react';
import MultiSelect from 'react-native-multiple-select';

import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView } from "react-native";
import Navbar from "./../../components/Navbar";
import AsyncStorage from '@react-native-async-storage/async-storage'




// const items = [{
//   id: '92iijs7yta',
//   name: 'Ondo'
// }, {
//   id: 'a0s0a8ssbsd',
//   name: 'Ogun'
// }, {
//   id: '16hbajsabsd',
//   name: 'Calabar'
// }, {
//   id: 'nahs75a5sg',
//   name: 'Lagos'
// }, {
//   id: '667atsas',
//   name: 'Maiduguri'
// }, {
//   id: 'hsyasajs',
//   name: 'Anambra'
// }, {
//   id: 'djsjudksjd',
//   name: 'Benue'
// }, {
//   id: 'sdhyaysdj',
//   name: 'Kaduna'
// }, {
//   id: 'suudydjsjd',
//   name: 'Abuja'
// }
// ];

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
    setselectedItems([])
    for (let i = 0; i < sItems.length; i++) {
      let id = sItems[i]
      setselectedItems(prevArray => [...prevArray, id])
    }
  };

  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.title}>Symptoms Form</Text>
      </View>
      <View style={{ margin: 10 }}>
        <Text style={styles.text}>   Patient Name: </Text>
        <Text style={styles.text}>   Date: </Text>
      </View>
      <View>
        <MultiSelect
          hideTags
          items={items}
          uniqueKey="id"
          ref={(component) => { this.multiSelect = component }}
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
          hideSubmitButton = {true}
          styleListContainer={{height: 256}}
        />
        <View style={{ flex: 1, margin: 10 }}>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
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
    marginBottom: 10,
    borderRadius: 10
  }

});

export default SymptosForm;
