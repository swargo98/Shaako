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

const Profile = ({ route, navigation }) => {
    let { patient_id } = route.params;

    // name, address, contactNo, age, gender, chwName
    let [name, setname] = useState('');
    let [address, setaddress] = useState('');
    let [contactNo, setcontactNo] = useState('');
    let [age, setage] = useState('');
    let [gender, setgender] = useState('');
    let [chwName, setchwName] = useState('');
    let [previousForms, setpreviousForms] = useState([])
    let [myimage, setmyimage] = useState(null)

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

        setpreviousForms([])

        console.log(gender)

        for (let i = 0; i < d.visitFormsId.length; i++) {
            let id = d.visitFormsId[i]
            let date = d.visitFormsDate[i]
            setpreviousForms(prevArray => [...prevArray, { id: id, date: date }]);
            // console.log(now)
        }

        console.log(name)
        console.log(address)
        console.log(contactNo)
        console.log(previousForms)

        let response2 = await fetch(global.ip + '/patient/getPatientImage', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(patient_id)
        })

        let image = await response2.blob()
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            var base64data = reader.result;
            setmyimage(base64data)
            console.log(myimage)
        }
        console.log(1)
        let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        await sleep(1000);
        console.log(2)


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
                            <Card.Image style={{ width: 160, height: 160, borderRadius: 40 }} source={{ uri: myimage, scale: 1 }} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>{name}{'\n'}</Text>
                        </View>



                        {/* <View style={styles.posts}>
                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 10, backgroundColor: "green", width: 150 }}
                                title='কল করুন'
                                onPress={() => { call(args).catch(console.error) }} />

                            <Button
                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green", width: 150 }}
                                title='নতুন ভিজিট ফর্ম'
                                onPress={() => navigation.navigate('SymptomsForm', { patient_id: patient_id })} />
                        </View> */}

                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>

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
                                name="form-select"
                                size={40}
                                alignItems="center"
                                onPress={() => navigation.navigate('SymptomsForm', { patient_id: patient_id })}
                            
                            ></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                        </View>


                        <Card.Divider></Card.Divider>
                        <View style={{ margin: 10 }}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>{'\n'}বয়স </Text></Text>
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
                        <View style={{ margin: 10 }}>
                            <Text style={styles.text}>পূর্ববর্তী ভিজিটসমূহ</Text>
                        </View>

                        <View>
                            {previousForms.map(a => {
                                return (
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                            <View>
                                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>তারিখ </Text></Text>
                                        <Text style={{ fontSize: 16, }}>{a.date}{'\n'} </Text>
                                            </View>
                                        
                                        <Button
                                            buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 10, backgroundColor: "green", width: 150 }}
                                            title='ভিজিট দেখুন'
                                            onPress={() => navigation.navigate('SymptomsFormPrev', { patient_id: patient_id, form_id: a.id })} />

                                    </View>
                                    <Card.Divider></Card.Divider>
                                    </View>
                                    );
                            })}                
                            
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
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 10,
        fontSize: 18
    }

});

export default Profile;
