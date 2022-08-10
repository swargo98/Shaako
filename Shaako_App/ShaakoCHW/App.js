import React from "react";
import LoginScreen from "react-native-login-screen";
import {View, Text, StyleSheet, Button, Image} from "react-native";
import { NativeRouter ,Link } from "react-router-native";



export default function App() {
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
