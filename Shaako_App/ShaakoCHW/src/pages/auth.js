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
} from "react-native";

const Authentication = () => {
    // let [username, setusername] = useState(null)
    // let [password, setpassword] = useState(null)
    // let [isLoggedIn, setisLoggedIn] = useState(false)
    // let [failedLogin, setfailedLogin] = useState(false)

    // useEffect(() => {
    //     checkAlreadyLogged()
    // }, [])

    // let checkAlreadyLogged = () => {
    //     let res = localStorage.getItem('logged')
    //     if (res === 'true') {
    //         setisLoggedIn(true)
    //     }
    // }

    // let handleChangeUsername = (value) => {
    //     setusername(username => ({ ...username, 'username': value }))
    // }

    // let handleChangePassword = (value) => {
    //     setpassword(password => ({ ...password, 'password': value }))
    // }

    // let handleSubmit = async () => {
    //     if (username && password) {
    //         console.log("Username : ", username, " Password : ", password)
    //         let response = await fetch('http://127.0.0.1:8000/organization/login', {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ username, password })
    //         })
    //         let data = await response.json()
    //         if (data.correct === 'True') {
    //             setisLoggedIn(true)
    //             localStorage.setItem('token', data.token)
    //             localStorage.setItem('organization', data.organization)
    //             localStorage.setItem('admin_id', data.id)
    //             console.log(data.token)
    //         }
    //         else {
    //             setfailedLogin(true)
    //         }
    //     }
    // }

    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./../../assets/logo.png")} />
 
      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="ইমেইল"
          placeholderTextColor="white"
          onChangeText={(email) => setEmail(email)}
        />
      </View>
 
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="পাসওয়ার্ড"
          placeholderTextColor="white"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
 
      <TouchableOpacity style={styles.loginBtn}>
        <Text style={styles.loginText}>লগ ইন</Text>
      </TouchableOpacity>
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
  }
});

export default Authentication;
