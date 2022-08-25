import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image, AppRegistry, ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import CupertinoButtonInfo from "../../components/CupertinoButtonInfo";
import CupertinoButtonInfo2 from "../../components/CupertinoButtonInfo2";
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
    let handleClick = async (notification) => {
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        let response = await fetch(global.ip + '/CHW/makeReadNotification', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(notification.id)
        })
        let d = await response.json()
        console.log(d)

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
        if (notification.notification_type === "campaign")
        {
            navigation.navigate('CampaignList')
        }
        
    }
    return (

        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>
                {result.map(a => {
                    return (
                        <View>
                        <CupertinoButtonInfo2
                            style={!a.is_read?styles.cupertinoButtonInfo_:styles.cupertinoButtonInfo2_}
                            text={a.ago_minute}
                            handleClick={() => handleClick(a)}
                        >
                        </CupertinoButtonInfo2>
                        <CupertinoButtonInfo
                            style={!a.is_read?styles.cupertinoButtonInfo:styles.cupertinoButtonInfo2}
                            text={a.description}
                            handleClick={() => handleClick(a)}
                        >
                        </CupertinoButtonInfo>
                        </View>
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
        height: 58,
        width: "100%",
        marginTop: "0%",
        alignSelf: "center",
        backgroundColor: "#82b5a0"
    },
    cupertinoButtonInfo2: {
        height: 48,
        width: "100%",
        marginTop: "0%",
        alignSelf: "center",
        backgroundColor: "#a1b5a8"
    },

    cupertinoButtonInfo_: {
        height: 18,
        width: "100%",
        marginTop: "2%",
        alignSelf: "center",
        backgroundColor: "#82b5a0",
        // fontSize: 10,
    },
    cupertinoButtonInfo2_: {
        height: 18,
        width: "100%",
        marginTop: "2%",
        alignSelf: "center",
        backgroundColor: "#a1b5a8",
        // fontSize: 10,
    }

});

export default Notification;