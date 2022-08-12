import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/pages/auth.js'
import Home from './src/pages/home.js'
import Notification from "./src/pages/notification.js";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Notification">
        <Stack.Screen name="Login" component={Authentication} options={{header: () => null}} />
        <Stack.Screen name="Home" component={Home} options={{header: () => null}} />
        <Stack.Screen name="Notification" component={Notification} options={{header: () => null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
