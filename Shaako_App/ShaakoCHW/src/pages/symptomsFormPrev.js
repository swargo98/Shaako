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

const SymptomsFormPrev = ({ route, navigation }) => {
    let { patient_id, form_id } = route.params;
    
    // name, address, contactNo, age, gender, chwName
    let [name, setname] = useState('');
    let [address, setaddress] = useState('');
    let [contactNo, setcontactNo] = useState('');
    let [age, setage] = useState('');
    let [gender, setgender] = useState('');
    let [chwName, setchwName] = useState('');

    // temperature,  blood_pressure, suggestions,  assumed_disease,  next_visit_date, summary,  symptoms_list,  date
    let [temperature, settemperature] = useState('');
    let [blood_pressure, setblood_pressure] = useState('');
    let [suggestions, setsuggestions] = useState('');
    let [assumed_disease, setassumed_disease] = useState('');
    let [next_visit_date, setnext_visit_date] = useState('');
    let [summary, setsummary] = useState('');
    let [symptoms_list, setsymptoms_list] = useState([]);
    let [date, setdate] = useState('');

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        console.log("patient_id: " + patient_id)
        console.log("form_id: " + form_id)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        console.log(tok)
        let response = await fetch(global.ip + '/chw/patientProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(form_id)
        })
        let d = await response.json()
        // set name, address, contactNo, age, gender, chwName
        setname(d['name'])
        setaddress(d['address'])
        setcontactNo(d['contactNo'])
        setage(d['age'])
        setgender(d['gender'])
        setchwName(d['chwName'])

        // set temperature,  blood_pressure, suggestions,  assumed_disease,  next_visit_date, summary,  symptoms_list,  date
        settemperature(d['temperature'])
        setblood_pressure(d['blood_pressure'])
        setsuggestions(d['suggestions'])
        setassumed_disease(d['assumed_disease'])
        setnext_visit_date(d['next_visit_date'])
        setsummary(d['summary'])
        console.log(d['symptoms'])
        setsymptoms_list([])
        for (let i = 0; i < d.symptoms.length; i++) {
            let name = d.symptoms[i]
            setsymptoms_list(prevArray => [...prevArray, { name: name }]);
            // console.log(now)
        }
        setdate(d['date'])


        console.log(name)
        console.log(address)
        console.log(contactNo)
        console.log(symptoms_list)
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
                            <Text style={styles.title}>পূর্ববর্তী ভিজিট তথ্য</Text>
                        </View>        

                    
                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>
                            <Text><Text style={{fontWeight: "bold"}}>নামঃ </Text>{name} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>বয়সঃ </Text>{age} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>লিঙ্গঃ </Text>{gender} </Text>                    
                            <Text><Text style={{fontWeight: "bold"}}>বর্তমান ঠিকানাঃ </Text>{address} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>ফোনঃ </Text>{contactNo} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>ডাটাবেইজ এ যুক্ত করেছেনঃ </Text>{chwName} </Text>                    

                        </View>

                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>তারিখঃ </Text>                                            
                        </View>

                        <View>
                            <Text><Text style={{fontWeight: "bold"}}>তাপমাত্রাঃ </Text>{temperature} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>রক্তচাপঃ </Text>{blood_pressure} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>অনুমিত রোগঃ </Text>{assumed_disease} </Text>                    
                            <Text style={{fontWeight: "bold"}}>লক্ষণসমূহঃ </Text>
                            {symptoms_list.map(a => {
                                return (
                                    <View>
                                        <Text>{a.name}</Text>
                                    </View>
                                    );
                            })}        
                            <Text><Text style={{fontWeight: "bold"}}>পরামর্শঃ </Text>{suggestions} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>সামারিঃ </Text>{summary} </Text>
                            <Text><Text style={{fontWeight: "bold"}}>পরবর্তী ভিজিটের তারিখঃ </Text>{next_visit_date} </Text>
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

export default SymptomsFormPrev;
