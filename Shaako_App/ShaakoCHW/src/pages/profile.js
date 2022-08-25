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

const Profile = ({ route, navigation }) => {
    let { patient_id } = route.params;
    
    // name, address, contactNo, age, gender, chwName
    let [name, setname] = useState('');
    let [address, setaddress] = useState('');
    let [contactNo, setcontactNo] = useState('');
    let [age, setage] = useState('');
    let [gender, setgender] = useState('');
    let [chwName, setchwName] = useState('');

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        console.log("patient_id: " + patient_id)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        console.log(tok)
        let response = await fetch(global.ip + '/chw/patientProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(patient_id)
        })
        let d = await response.json()
        // set name, address, contactNo, age, gender, chwName
        setname(d['name'])
        setaddress(d['address'])
        setcontactNo(d['contactNo'])
        setage(d['age'])
        setgender(d['gender'])
        setchwName(d['chwName'])

        console.log(name)
        console.log(address)
        console.log(contactNo)
    }

    const args = {
        number: contactNo, // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
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
                            <Text style={styles.title}>{name}</Text>
                        </View>

                        

                        <View style={styles.posts}>
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 10, backgroundColor: "green", width: 150 }}
                                title='কল করুন'                            
                                onPress={() => { call(args).catch(console.error) }} />
                            
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green", width: 150 }}
                                title='নতুন ভিজিট ফর্ম'                            
                                onPress={() => navigation.navigate('SymptomsForm', { patient_id: patient_id })} />
                        </View>

                    
                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>
                            <Text><Text style={{fontWeight: "bold"}}>বয়সঃ </Text>{age} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>লিঙ্গঃ </Text>{gender} </Text>                    
                            <Text><Text style={{fontWeight: "bold"}}>বর্তমান ঠিকানাঃ </Text>{address} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>ফোনঃ </Text>{contactNo} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>ডাটাবেইজ এ যুক্ত করেছেনঃ </Text>{chwName} </Text>                    

                        </View>

                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>পূর্ববর্তী ভিজিটসমূহ</Text>                                            
                        </View>

                        <View>
                        <View style={{flexDirection:"row"}}>
                            <Text><Text style={{fontWeight: "bold"}}>তারিখঃ </Text>01744922677 </Text>
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 10, backgroundColor: "green", width: 150 }}
                                title='ভিজিট দেখুন'                            
                                onPress={() => { call(args).catch(console.error) }} />
                            
                        </View>
                        <Card.Divider></Card.Divider>
                        </View>

                        <View>
                        <View style={{flexDirection:"row"}}>
                            <Text><Text style={{fontWeight: "bold"}}>তারিখঃ </Text>01744922677 </Text>
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 10, backgroundColor: "green", width: 150 }}
                                title='ভিজিট দেখুন'                            
                                onPress={() => { call(args).catch(console.error) }} />
                            
                        </View>
                        <Card.Divider></Card.Divider>
                        </View>

                        <View>
                        <View style={{flexDirection:"row"}}>
                            <Text><Text style={{fontWeight: "bold"}}>তারিখঃ </Text>01744922677 </Text>
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 10, backgroundColor: "green", width: 150 }}
                                title='ভিজিট দেখুন'                            
                                onPress={() => { call(args).catch(console.error) }} />
                            
                        </View>
                        <Card.Divider></Card.Divider>
                        </View>

                    </Card>

                    <ScrollView>
                        
                    </ScrollView>
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
        flexDirection: "column",
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
