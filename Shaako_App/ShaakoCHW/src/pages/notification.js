import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image, AppRegistry, ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import CupertinoButtonInfo from "../../components/CupertinoButtonInfo";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'
function Notification({navigation}) {
    let [result, setresult] = useState([])

    useEffect(() => {
        getData()
    }, [])
    let getData = async () => {
        let chw_id = await AsyncStorage.getItem('chw_id')
        chw_id = JSON.parse(chw_id)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        
        console.log('----------------------------------------------------')
        console.log(chw_id + ' ' + tok)
        let response = await fetch(global.ip + '/chw/getNotification', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ 'chw_id': chw_id })
        })
        let d = await response.json()
        setresult(d)
        console.log(d)
    }
    let handleClick = (notification) => {
        console.log("asche")
        console.log(notification)
        if (notification.notification_type === "quiz")
        {
            navigation.navigate('Quiz', { id: notification.type_id })
        }
        if (notification.notification_type === "blogpost")
        {
            navigation.navigate('BlogPost', { lesson_id: notification.type_id })
        }
        
    }
    return (

        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>
                {result.map(a => {
                    return (
                        <CupertinoButtonInfo
                            style={styles.cupertinoButtonInfo}
                            text={a.description}
                            handleClick={() => handleClick(a)}
                        ></CupertinoButtonInfo>
                    );
                })}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cupertinoButtonInfo: {
        height: 68,
        width: "100%",
        marginTop: "10%",
        alignSelf: "center"
    },
    cupertinoButtonInfo2: {
        height: 68,
        width: "100%",
        marginTop: "3%",
        alignSelf: "center"
    }
});

export default Notification;