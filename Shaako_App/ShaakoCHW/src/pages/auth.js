import React, { useState, useEffect } from 'react'
import LoginScreen from "react-native-login-screen";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage'



const Authentication = ({navigation }) => {
  let [username, setusername] = useState(null)
  let [password, setpassword] = useState(null)
  let [isLoggedIn, setisLoggedIn] = useState(false)
  let [failedLogin, setfailedLogin] = useState(false)

  useEffect(() => {
    
    checkAlreadyLogged()

    let _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          // We have data!!
          console.log(value);
          navigation.navigate('Home');
        }
      } catch (error) {
        // Error retrieving data
      }
    };

  }, [])

  let checkAlreadyLogged = () => {
    
  }

  let handleChangeUsername = (value) => {
    console.log(value)
    setusername(value)
  }

  let handleChangePassword = (value) => {
    console.log(value)
    setpassword(value)
  }

  let handleSubmit = async () => {
    if (username && password) {
      console.log("Username : ", username, " Password : ", password)
      let response = await fetch(global.ip+'/chw/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      let data = await response.json()
      console.log(data)
      if (data.correct === 'True') {
        try {
          AsyncStorage.setItem('token', data.token);
          AsyncStorage.setItem('organization', data.org_id);
          AsyncStorage.setItem('chw_id', data.chw_id);
          AsyncStorage.setItem('sup_id', data.sup_id);
        } 
        catch (error) {
          console.log("hoynaaaaaaaaaaaaaaai")
          console.log(error)
        }
        setisLoggedIn(true)
      }
      else {
        setfailedLogin(true)
      }
    }
  }


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../../assets/logo.png")} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="ইমেইল"
          placeholderTextColor="white"
          onChangeText={handleChangeUsername}
          value={username?.body}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="পাসওয়ার্ড"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={handleChangePassword}
          value = {password?.body}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
        <Text style={styles.loginText}>লগ ইন</Text>
      </TouchableOpacity>
      <View>
        {failedLogin && <Text style={styles.failedLogin}>লগ ইন ফেইলড</Text>}
        {isLoggedIn && navigation.navigate('Home') }
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#41cca6",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#7ca4e2",
    borderRadius: 30,
    width: "80%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#0c6efc",
  },

  loginText: {
    color: "white"
  },

  failedLogin: {
    color: "red",
  }
});

export default Authentication;
