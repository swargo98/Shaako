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
        let response = await fetch(global.ip + '/chw/prevVisitForm', {
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
            <Navbar navigation={navigation}></Navbar>

            <ScrollView>
                <View >
                    <Card> 
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>পূর্ববর্তী ভিজিট তথ্য</Text>
                        </View>        

                    
                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>                             
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>নাম </Text></Text>
                            <Text style={{ fontSize: 16, }}>{name}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>বয়স </Text></Text>
                            <Text style={{ fontSize: 16, }}>{age}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>লিঙ্গ </Text></Text>
                            <Text style={{ fontSize: 16, }}>{gender}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>বর্তমান ঠিকানা</Text></Text>
                            <Text style={{ fontSize: 16, }}>{address}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>ফোন</Text></Text>
                            <Text style={{ fontSize: 16, }}>{contactNo}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>ডাটাবেইজ এ যুক্ত করেছেন</Text></Text>
                            <Text style={{ fontSize: 16, }}>{chwName}{'\n'} </Text>                   

                        </View>

                        <Card.Divider></Card.Divider>
                        <View style={{margin: 10}}>
                            <Text style={styles.text}>তারিখঃ {date}</Text>                                            
                        </View>

                        <View>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>তাপমাত্রা </Text></Text>
                            <Text style={{ fontSize: 16, }}>{temperature}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>রক্তচাপ </Text></Text>
                            <Text style={{ fontSize: 16, }}>{blood_pressure}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>অনুমিত রোগ </Text></Text>
                            <Text style={{ fontSize: 16, }}>{assumed_disease}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>লক্ষণসমূহ</Text></Text>
                            

                            {symptoms_list.map(a => {
                                return (
                                    <View>
                                        <Text style={{ fontSize: 16, }}>    {a.name}{'\n'} </Text>
                                    </View>
                                    );
                            })}        
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>পরামর্শ </Text></Text>
                            <Text style={{ fontSize: 16, }}>{suggestions}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>সামারি </Text></Text>
                            <Text style={{ fontSize: 16, }}>{summary}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>পরবর্তী ভিজিটের তারিখ </Text></Text>
                            <Text style={{ fontSize: 16, }}>{next_visit_date}{'\n'} </Text>
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
        borderRadius: 10,
        fontSize: 18,
    }

});

export default SymptomsFormPrev;
