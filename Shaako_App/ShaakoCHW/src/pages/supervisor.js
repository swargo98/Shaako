import React from "react";
import { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView, TouchableOpacity } from "react-native";
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
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
const Supervisor = ({ navigation }) => {
    let [name, setname] = useState('')
    let [myimage, setmyimage] = useState(null);
    let [number, setnumber] = useState('')
    let [mail, setmail] = useState('')
    let [upazilla, setupazilla] = useState('')
    let [district, setdistrict] = useState('')
    let [division, setdivision] = useState('')

    let sup_id = 0;
    let args = {
        number: '+8801842223102', // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
    }
    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        sup_id = await AsyncStorage.getItem('sup_id');
        sup_id = JSON.parse(sup_id)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)

        let response = await fetch(global.ip + '/supervisor/getProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(sup_id)
        })
        let d = await response.json()
        console.log(d)
        setname(d.name)
        args.number = d.contactNo
        console.log("number ", d.contactNo)
        setnumber(d.contactNo)
        setmail(d.email)
        setupazilla(d.upazilla)
        setdistrict(d.district)
        setdivision(d.division)


        let response2 = await fetch(global.ip + '/organization/image/supervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(sup_id)
        })

        let image = await response2.blob()
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            var base64data = reader.result;
            setmyimage(base64data)
            // console.log(now.image)
        }
        console.log(1)
        let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(1000);
        console.log(2)
    }



    let handleEmail = () => {
        const to = mail // string or array of email addresses
        email(to, {
            subject: '',
            body: 'Hello ' + name,
            checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
        }).catch(console.error)
    }


    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>

            <ScrollView>
                <View >
                    <Card>
                        <View style={{ alignItems: 'center' }}>
                            <Card.Image style={{ width: 160, height: 160, borderRadius: 40 }} source={{ uri: myimage, scale: 1 }} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>{name}</Text>
                        </View>

                        <Card.Divider></Card.Divider>
                        <View style={{ flexDirection: "row", justifyContent:"center" }}>

                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialCommunityIconsIcon
                                name="phone"
                                size={40}
                                alignItems="center"
                                onPress={() => { call(args).catch(console.error) }}
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <MaterialCommunityIconsIcon
                                name="email"
                                size={40}
                                alignItems="center"
                                onPress={handleEmail}
                            
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        </View>


                        {/* <Card.Divider></Card.Divider> */}
                        <View style={{ margin: 10 }}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>বর্তমান ঠিকানা: </Text>Dhaka </Text>
                            <Text><Text style={{ fontWeight: "bold" }}>ফোন: </Text>{number}</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>ইমেইল: </Text>{mail}</Text>
                            <Text><Text style={{ fontWeight: "bold" }}>অধীনস্থ এলাকা: </Text>{upazilla}, {district}, {division} </Text>
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
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 10
    },
    iconButton: {
        padding: 11
      },

});

export default Supervisor;
