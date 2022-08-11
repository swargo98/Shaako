import React, { useState, useEffect } from 'react'
import LoginScreen from "react-native-login-screen";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorageStatic,
} from "react-native";

import AsyncStorage from '@react-native-community/async-storage';



const Authentication = () => {
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
    setusername(username => ({ ...username, 'username': value }))
  }

  let handleChangePassword = (value) => {
    console.log(value)
    setpassword(password => ({ ...password, 'password': value }))
  }

  let handleSubmit = async () => {
    if (username && password) {
      console.log("Username : ", username, " Password : ", password)
      let response = await fetch('http://127.0.0.1:8000/chw/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      let data = await response.json()
      if (data.correct === 'True') {
        setisLoggedIn(true)

        let _storeData = async () => {
          try {
            await AsyncStorage.setItem('token', data.token);
            await AsyncStorage.setItem('organization', data.organization);
            await AsyncStorage.setItem('chw_id', data.id);
          } catch (error) {
            // Error saving data
            console.log(error)
          }
        };
        // AsyncStorageStatic.setItem('token', data.token)
        // AsyncStorageStatic.setItem('organization', data.organization)
        // AsyncStorageStatic.setItem('chw_id', data.id)
        console.log(data.token)
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
        {isLoggedIn && <Navigate to="/home" replace={true} />}
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
