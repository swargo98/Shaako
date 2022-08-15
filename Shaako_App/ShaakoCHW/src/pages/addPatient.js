import React, { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry, TouchableOpacity, } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

import { Card, ListItem, Button, Icon, Header, Input } from 'react-native-elements'
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'

// Ref: https://reactnativeelements.com/docs/2.3.2/input#label

const AddPatient = ({ navigation }) => {
    const [date, setDate] = useState('05-07-1998');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [gen, setgen] = useState('');
    let [isLoggedIn, setisLoggedIn] = useState(false)
    let [failedLogin, setfailedLogin] = useState(false)

    const gender = [
        {
            label: 'পুরুষ'
        },
        {
            label: 'মহিলা'
        }
    ];
    let handleChangeName = (value) => {
        console.log(value)
        setname(value)
    }
    let handleChangePhone = (value) => {
        console.log(value)
        setphone(value)
    }
    let handleChangeAddress = (value) => {
        console.log(value)
        setaddress(value)
    }
    let handleSubmit = async () => {
        console.log(name + " " + address + " " + phone + " " + gen + " " + date)
        let tok = await AsyncStorage.getItem('token')
        tok=JSON.parse(tok)
        let response = await fetch(global.ip + '/CHW/addCHW', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ name, address, phone, gen, date })
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
            <Navbar></Navbar>

            <View style={{ alignItems: 'center', padding: 10 }} >
                <View style={styles.FormData}>
                    <Input onChangeText={handleChangeName}
                        label="রোগীর নাম"
                    />

                    <Input onChangeText={handleChangePhone}
                        label="মোবাইল নাম্বার"
                    />

                    <Input onChangeText={handleChangeAddress}
                        label="ঠিকানা"
                    />
                    <Text style={styles.baseText}>লিঙ্গ</Text>
                    <RadioButtonRN
                        data={gender}
                        selectedBtn={(e) => setgen(e.label)}
                    />
                    <Text style={styles.baseText}> {'\n'}জন্ম তারিখ</Text>
                    <DatePicker
                        style={styles.datePickerStyle}
                        date={date}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                right: -5,
                                top: 4,
                                marginLeft: 0,
                            },
                            dateInput: {
                                borderColor: "gray",
                                alignItems: "center",
                                borderWidth: 0,
                                borderBottomWidth: 1,
                                marginLeft: 10,
                            },
                            placeholderText: {
                                fontSize: 17,
                                color: "gray"
                            },
                            dateText: {
                                fontSize: 17,
                            }
                        }}
                        onDateChange={(date) => {
                            setDate(date);
                        }}
                    />

                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                        <Text style={styles.loginText}>সাবমিট</Text>
                    </TouchableOpacity>

                    <View>
                        {failedLogin && <Text style={styles.failedLogin}>রোগী যুক্ত সম্ভব হয় নি</Text>}
                        {isLoggedIn && navigation.navigate('Home')}
                    </View>
                </View>
            </View>
        </View>
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
    // container: {
    //     flex: 1,
    //     padding: 10,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#A8E9CA'
    // },
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

export default AddPatient;
