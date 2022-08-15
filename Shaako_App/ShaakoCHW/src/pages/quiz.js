import React from "react";
import { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
// import { View, Text, StyleSheet, Image, AppRegistry } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import { View, Text, StyleSheet, AppRegistry, ScrollView } from "react-native";

// import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
// import blog from "./../../assets/blog.json";
import HTMLView from 'react-native-htmlview';
import styled from 'styled-components';
import { Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'

import QuizeSingleChoice from "react-native-react-native-quiz-single-choice";

const Quiz = ({ route, navigation }) => {
  let { id } = route.params;
  // console.log(id)
  let sup_id = 0;
  const [data, setdata] = useState(null)
  let [data2, setdata2] = useState([])
  let [a, seta] = useState(true)
  useEffect(() => {
    getQuiz()
  }, [])

  let getQuiz = async () => {
    // console.log(typeof data2)
    sup_id = await AsyncStorage.getItem('sup_id');
    sup_id=JSON.parse(sup_id)

    let tok = await AsyncStorage.getItem('token')
    tok = JSON.parse(tok)

    let response = await fetch(global.ip + '/supervisor/getMyQuiz', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + tok
      },
      body: JSON.stringify({ id, sup_id })
    })
    let d = await response.json()
    console.log(d)
    //iterate in d.items
    setdata([])
    for (let i = 0; i < d.items.length; i++) {
      let now = {}
      now.question = d.items[i].ques
      now.optionA = d.items[i].option1
      now.optionB = d.items[i].option2
      now.optionC = d.items[i].option3
      now.optionD = d.items[i].option4
      if (d.items[i].correct === 1) {
        now.answer = d.items[i].option1
      }
      if (d.items[i].correct === 2) {
        now.answer = d.items[i].option2
      }
      if (d.items[i].correct === 3) {
        now.answer = d.items[i].option3
      }
      if (d.items[i].correct === 4) {
        now.answer = d.items[i].option4
      }
      setdata(data => [now, ...data])
      setdata2(data2 => [d.items[i], ...data2])
    }
    seta(false)
  }

  let handleSubmit = async (results) => {
    console.log(results)
    let now = []
    for (let i = 0; i < results.length; i++) {
      for (let j = 0; j < data2.length; j++) {
        if (results[i].question === data2[j].ques) {
          let now2 = {}
          now2.id = data2[j].id
          now2.response = 0
          // console.log(data2[i].option1 + ' ' + data2[i].option2 + ' ' + results[i].response)
          if (results[i].response === data2[j].option1) {
            now2.response = 1
          }
          else if (results[i].response === data2[j].option2) {
            now2.response = 2
          }
          else if (results[i].response === data2[j].option3) {
            now2.response = 3
          }
          else if (results[i].response === data2[j].option4) {
            now2.response = 4
          }
          now.push(now2)
          break
        }
      }

    }
    console.log('----------------------------------------------------')
    console.log(now)
    console.log(id)
    let tok = await AsyncStorage.getItem('token')
    tok = JSON.parse(tok)

    let chw_id = await AsyncStorage.getItem('chw_id')
    chw_id = JSON.parse(chw_id)
    
    let response = await fetch(global.ip + '/chw/submitQuiz', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'TOKEN ' + tok
      },
      body: JSON.stringify({ id, now, chw_id })

    })
    let data = await response.json()
    console.log("got back "+data)
    navigation.navigate('QuizSubmission', { submission_id: data })
  }

  return a ? null : (
    <View style={styles.container}>
      <Navbar></Navbar>
      <QuizeSingleChoice
        containerStyle={{ backgroundColor: "#61dafb", paddingTop: 30 }}
        questionTitleStyle={{ fontSize: 22, color: "#FFF" }}
        responseStyle={{
          borderRadius: 15,
        }}
        responseTextStyle={{ fontSize: 12, fontWeight: "normal" }}
        selectedResponseStyle={{
          borderRadius: 15,
          backgroundColor: "#fa5541",
        }}
        selectedResponseTextStyle={{
          fontSize: 14,
          fontWeight: "normal",
        }}
        responseRequired={true}
        nextButtonText={"Next"}
        nextButtonStyle={{ backgroundColor: "#06d755" }}
        nextButtonTextStyle={{ color: "#FFF" }}
        prevButtonText={"Prev"}
        prevButtonStyle={{ backgroundColor: "#fa5541" }}
        prevButtonTextStyle={{ color: "#FFF" }}
        endButtonText={"Done"}
        endButtonStyle={{ backgroundColor: "#000" }}
        endButtonTextStyle={{ color: "#FFF" }}
        buttonsContainerStyle={{ marginTop: "auto" }}
        onEnd={(results) => {
          handleSubmit(results)
        }}
        data={data}
      />
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
    flexDirection: "row"
  },

});

export default Quiz;
