import React from "react";
import { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Card, ListItem, Button, Icon, Header, SearchBar } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import call from 'react-native-phone-call'
import email from 'react-native-email'

const Profile = ({ navigation }) => {
    let [result, setresult] = useState([]);
    let [sup_image, setsup_image] = useState(null);
    let sup_id = 0;
    // let sup_id = 26;

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        sup_id = await AsyncStorage.getItem('sup_id');
        console.log(sup_id)
        console.log(await AsyncStorage.getItem('token'))
        let tok = await AsyncStorage.getItem('token')
        console.log(tok)
        let response = await fetch(global.ip + '/CHW/getLessonList', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(sup_id)
        })
        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id + " " + now.title + " " + now.supervisor_name + " " + now.upload_time)
            setresult(prevArray => [...prevArray, now]);
        }

        let response2 = await fetch(global.ip + '/organization/image/supervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(sup_id)
        })
        // let result = stackSizeSync();
        // console.log(result)

        //take image respone from bufferIO
        let image = await response2.blob()
        //convert to base64
        let image64 = await image.arrayBuffer()
        //convert to base64
        let image64base64 = await btoa(String.fromCharCode.apply(null, new Uint8Array(image64)))
        //convert to url
        let imageurl = `data:image/png;base64,${image64base64}`
        //push to array
        setsup_image(imageurl)
    }

    const args = {
        number: '+8801842223102', // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
    }

    let handleEmail = () => {
        const to = ['tiaan@email.com'] // string or array of email addresses
        email(to, {
            subject: 'Show how to use',
            body: 'Some body right here',
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
    }


    return (
        <View style={styles.container}>
            <Navbar></Navbar>

            <ScrollView>
                <View >
                    <Card> 
                        <View style={{ alignItems: 'center' }}>
                            <Card.Image style={{ width: 160, height: 160, borderRadius: 40 }} source={require("./../../assets/logo.png")} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>Touhid Rahman Daddy</Text>
                        </View>

                        

                        <View style={styles.posts}>
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green", width: 150 }}
                                title='কল করুন'                            
                                onPress={() => { call(args).catch(console.error) }} />

                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green", width: 150 }}
                                title='ইমেইল পাঠান'
                                onPress={handleEmail} />
                        </View>

                    
                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>
                            <Text><Text style={{fontWeight: "bold"}}>বর্তমান ঠিকানাঃ </Text>Dhaka </Text>
                            <Text><Text style={{fontWeight: "bold"}}>ফোনঃ </Text>01744922677 </Text>
                            <Text><Text style={{fontWeight: "bold"}}>ইমেইলঃ </Text>tbkds@gmail.com </Text>
                        </View>
                    </Card>
                </View>



            </ScrollView>
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
        flexDirection: "row",
        alignItems: 'center',
        padding: 10,
    },

    cardContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 0,
        alignItems: "center",
        justifyContent: 'space-between'
    },

    title: {
        fontWeight: "bold",
        marginVertical: 4,
        fontSize: 20,
    },

    text: {
        fontWeight: "bold",
        backgroundColor : "#2089dc",
        color : "white",
        textAlign : "center",
        paddingVertical : 5,
        marginBottom : 10,
        borderRadius: 10
    }

});

export default Profile;
