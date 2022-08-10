import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginScreen from "react-native-login-screen";

const Authentication = () => {
    let [username, setusername] = useState(null)
    let [password, setpassword] = useState(null)
    let [isLoggedIn, setisLoggedIn] = useState(false)
    let [failedLogin, setfailedLogin] = useState(false)

    useEffect(() => {
        checkAlreadyLogged()
    }, [])
    
    let checkAlreadyLogged = () => {
        let res=localStorage.getItem('logged')
        if(res==='true'){
            setisLoggedIn(true)
        }
    }

    let handleChangeUsername = (value) => {
        setusername(username => ({ ...username, 'username': value }))
    }
    
    let handleChangePassword = (value) => {
        setpassword(password => ({ ...password, 'password': value }))
    }

    let handleSubmit = async () => {
        if (username && password) {
            console.log("Username : ", username, " Password : ", password)
            let response = await fetch('http://127.0.0.1:8000/organization/login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            let data = await response.json()
            if (data.correct === 'True') {
                setisLoggedIn(true)
                localStorage.setItem('token', data.token)
                localStorage.setItem('organization', data.organization)
                localStorage.setItem('admin_id', data.id)
                console.log(data.token)
            }
            else {
                setfailedLogin(true)
            }
        }
    }

    return (
      <LoginScreen
      logoImageSource={require("./assets/logo.png")}
      onLoginPress={() => {}}
      onSignupPress={() => {}}
      onEmailChange={(email: string) => {}}
      onPasswordChange={(password: string) => {}}
      disableSocialButtons={true}
      signupText=""
    />
    );
}

export default Authentication;
