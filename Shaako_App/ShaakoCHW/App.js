import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authentication from './src/pages/auth.js'
import Home from './src/pages/home.js'
import Notification from "./src/pages/notification.js";
import BlogList from "./src/pages/blogList.js";
import QuizList from "./src/pages/quizList.js";
import CampaignList from "./src/pages/campaignList.js";
import AddPatient from "./src/pages/addPatient.js";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BlogList">
        <Stack.Screen name="Login" component={Authentication} options={{header: () => null}} />
        <Stack.Screen name="Home" component={Home} options={{header: () => null}} />
        <Stack.Screen name="Notification" component={Notification} options={{header: () => null}} />
        <Stack.Screen name="BlogList" component={BlogList} options={{header: () => null}} />
        <Stack.Screen name="QuizList" component={QuizList} options={{header: () => null}} />
        <Stack.Screen name="CampaignList" component={CampaignList} options={{header: () => null}} />
        <Stack.Screen name="AddPatient" component={AddPatient} options={{header: () => null}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
