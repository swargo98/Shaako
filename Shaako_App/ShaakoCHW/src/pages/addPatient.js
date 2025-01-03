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
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker';  // not react-image-picker
// Ref: https://reactnativeelements.com/docs/2.3.2/input#label

const AddPatient = ({ navigation }) => {
    const [date, setDate] = useState('05-07-1998');
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phone, setphone] = useState('');
    const [gen, setgen] = useState('');
    let [isLoggedIn, setisLoggedIn] = useState(false)
    let [failedLogin, setfailedLogin] = useState(false)
    const [image, setImage] = useState(null);
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
        let chw_id = await AsyncStorage.getItem('chw_id');
        chw_id = JSON.parse(chw_id)
        console.log(name + " " + address + " " + phone + " " + gen + " " + date)
        console.log(image)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        let response = await fetch(global.ip + '/CHW/addPatient', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ name, address, phone, gen, date, chw_id, image })
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

    let handleClickIMAGE = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        // console.log(result);



        if (!result.cancelled) {
            console.log("vitor")
            console.log(result.base64)
            setImage(result.base64);
            // console.log(image)
        }

    }

    let openCamera = async () => {
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true
            // allowsEditing: true,
            // aspect: [4, 3],
            // quality: 1,
        });

        // console.log(result);



        if (!result.cancelled) {
            console.log("vitor")
            setImage(result.base64);
            // console.log(image)
        }

    }

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>
            <View style={{ alignItems: 'center', padding: 0 }} >
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

                <TouchableOpacity style={styles.loginBtn} onPress={openCamera}>
                        <Text style={styles.loginText}>ছবি তুলুন</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleClickIMAGE}>
                        <Text style={styles.loginText}>ছবি আপলোড করুন</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
                        <Text style={styles.loginText}>সাবমিট</Text>
                    </TouchableOpacity>

                    <View>
                        {failedLogin && <Text style={styles.failedLogin}>রোগী যুক্ত সম্ভব হয় নি</Text>}
                        {isLoggedIn && navigation.navigate('Home')}
                    </View>
                </View>
            </View>
            </ScrollView>
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
        marginTop: 20,
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
        width: "90%",
        padding: 10,
    }

});

export default AddPatient;
