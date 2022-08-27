import React, { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry, TouchableOpacity, ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

import { Card, ListItem, Button, Icon, Header, Input } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CardDivider } from "@rneui/base/dist/Card/Card.Divider";

// Ref: https://reactnativeelements.com/docs/2.3.2/input#label

const CHWProfileEdit = ({ navigation }) => {
    let [name, setname] = useState('')
    let [email, setemail] = useState('')
    let [password, setpassword] = useState('')
    let [passwordOld, setpasswordOld] = useState('')
    let [password2, setpassword2] = useState('')
    let [contact, setcontact] = useState('')
    let [address, setaddress] = useState('')
    let [isLoggedIn, setisLoggedIn] = useState(false)
    let [failedLogin, setfailedLogin] = useState(false)

    useEffect(() => {
        getProfile();
    }, [])
    let getProfile = async () => {
        var id = await AsyncStorage.getItem('chw_id')
        id = JSON.parse(id)
        console.log(id)

        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        let response = await fetch(global.ip + '/organization/getCHWProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(id)
        })

        let d = await response.json()
        console.log(d);
        setname(d.name)
        setemail(d.email)
        setcontact(d.contactNo)
        setaddress(d.presentAddress)

    }

    let handleChangeemail = (value) => {
        setemail(value)
    }
    let handleChangepassword = (value) => {
        setpassword(value)
    }
    let handleChangecontact = (value) => {
        setcontact(value)
    }
    let handleChangeaddress = (value) => {
        setaddress(value)
    }

    let handleChangepassword2 = (value) => {
        setpassword2(value)
    }
    let handleChangepasswordOld = (value) => {
        setpasswordOld(value)
    }
    let handleSubmit = async () => {
        let id = await AsyncStorage.getItem('chw_id');
        id = JSON.parse(id)
        console.log(email + " " + password + " " + passwordOld + " " + password2 + " " + contact + " " + address)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        let response = await fetch(global.ip + '/CHW/updateCHWProfile', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ id, email, password, passwordOld, password2, contact, address })
        })
        let data = await response.json()
        console.log(data)
        if (data === 'True') {
            setisLoggedIn(true)
        }
        else {
            setfailedLogin(true)
        }

    }
    return (
        <View style={styles.container}>

            <Navbar navigation={navigation}></Navbar>
            <ScrollView>
                <View style={{ alignItems: 'center', padding: 10 }} >
                    <View style={styles.FormData}>
                        <Input placeholder={name} placeholderTextColor="#000000" disabled
                            label="নাম"
                        />
                        <Input onChangeText={handleChangeemail} placeholder={email} placeholderTextColor="#000000"
                            value={email} label="ইমেইল এড্রেস"
                        />
                        <Input onChangeText={handleChangecontact} placeholder={contact} placeholderTextColor="#000000"
                            value={contact} label="মোবাইল নম্বর"
                        />
                        <Input onChangeText={handleChangeaddress} placeholder={address} placeholderTextColor="#000000"
                            value={address} label="ঠিকানা"
                        />
                        <CardDivider></CardDivider>
                        <Text>পাসওয়ার্ড অপরিবর্তিত রাখতে ফিল্ড দুটি খালি রাখুন{'\n'}</Text>
                        <Input onChangeText={handleChangepassword} secureTextEntry={true}
                            label="নতুন পাসওয়ার্ড"
                        />
                        <Input onChangeText={handleChangepassword2} secureTextEntry={true}
                            label="পুনরায় লিখুন"
                        />
                        <CardDivider></CardDivider>
                        <Input onChangeText={handleChangepasswordOld} secureTextEntry={true}
                            label="পুরোনো পাসওয়ার্ড"
                        />
                        <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                            <Text style={styles.loginText}>সাবমিট</Text>
                        </TouchableOpacity>

                        <View>
                            {failedLogin && <Text style={styles.failedLogin}>প্রোফাইল আপডেট সফল হয় নি</Text>}
                            {isLoggedIn && navigation.navigate('CHWProfile')}
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#41cca6",
        // alignItems: "center",
    },
    baseText: {
        fontWeight: 'bold',
        fontSize: 17,
        color: '#30967a',
        marginLeft: 10,
    },
    failedLogin: {
        textAlign: 'center',
        color: "red",
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginLeft: "10%",
        backgroundColor: "#0c6efc",
    },
    loginText: {
        color: "white"
    },
    title: {
        textAlign: 'left',
        fontSize: 20,
        fontWeight: 'bold',
    },
    datePickerStyle: {
        // width: 230,
        width: "80%",
    },
    text: {
        textAlign: 'left',
        width: "80%",
        fontSize: 16,
        color: "#000"
    },

    FormData: {
        backgroundColor: "white",
        width: "80%",
        padding: 10,
    }

});

export default CHWProfileEdit;
