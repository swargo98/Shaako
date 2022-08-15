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

const PatientList = ({ navigation }) => {
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


    return (
        <View style={styles.container}>
            <Navbar></Navbar>
            <SearchBar
                placeholder="রোগীর তালিকা থেকে খুঁজুন"
                lightTheme
            />
            <ScrollView>
                <View >
                    <Card>
                        <View style={styles.cardContainer}>
                            <View>
                                <Card.Title>Touhid Rahman Daddy</Card.Title>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                <Button
                                    buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Profile'
                                     />

                                    <Button
                                    buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green" }}
                                    title='Call'
                                    color="#f194ff"                                    
                                    onPress={() => { call(args).catch(console.error) }} />
                                </View>
                                

                            </View>

                            <View>
                                <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require("./../../assets/logo.png")} />
                            </View>
                        </View>
                    </Card>
                </View>

                <View >
                    <Card>
                        <View style={styles.cardContainer}>
                            <View>
                                <Card.Title>Touhid Rahman Daddy</Card.Title>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                <Button
                                    buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Profile'
                                     />

                                    <Button
                                    buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green" }}
                                    title='Call'
                                    color="#f194ff"                                    
                                    onPress={() => { call(args).catch(console.error) }} />
                                </View>
                                

                            </View>

                            <View>
                                <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require("./../../assets/logo.png")} />
                            </View>
                        </View>
                    </Card>
                </View>

                <View >
                    <Card>
                        <View style={styles.cardContainer}>
                            <View>
                                <Card.Title>Touhid Rahman Daddy</Card.Title>
                                <View style={{flex: 1, flexDirection: "row"}}>
                                <Button
                                    buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='Profile'
                                     />

                                    <Button
                                    buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green" }}
                                    title='Call'
                                    color="#f194ff"                                    
                                    onPress={() => { call(args).catch(console.error) }} />
                                </View>
                                

                            </View>

                            <View>
                                <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require("./../../assets/logo.png")} />
                            </View>
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
        flexDirection: "row"
    },

    cardContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        padding: 0,
        alignItems: "center",
        justifyContent: 'space-between'
    },

});

export default PatientList;
