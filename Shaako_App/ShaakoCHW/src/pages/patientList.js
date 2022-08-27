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
    let [dummy,setdummy]=useState(true);
    let [search, setsearch] = useState('');
 
    useEffect(() => {
        getPatientList()
    }, [])

    let getPatientList = async () => {
        let chw_id = await AsyncStorage.getItem('chw_id')
        let tok = await AsyncStorage.getItem('token')
        chw_id = JSON.parse(chw_id)
        tok = JSON.parse(tok)
        // console.log(chw_id)

        let response = await fetch(global.ip + '/chw/getPatientList', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(chw_id)
        })
        // console.log('came')

        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            // console.log(now.id + " " + now.name + " " + now.contact_no)

            now.args = {
                number: now.contact_no, // String value with the number to call
                prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
                skipCanOpen: true // Skip the canOpenURL check
            }

            let response2 = await fetch(global.ip + '/patient/getPatientImage', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'TOKEN ' + tok
                },
                body: JSON.stringify(now.id)
            })

            let image = await response2.blob()
            var reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onloadend = function () {
                var base64data = reader.result;
                now.image = base64data
                // console.log(now.image)
            }
            // console.log(1)
            let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
            await sleep(1000);
            // console.log(2)

            setresult(prevArray => [...prevArray, now]);
        }
        // console.log(result)
        setdummy(false)
        
    } 


    return  dummy? null : ( 
        <View style={styles.container}>
            <Navbar></Navbar>
            <SearchBar
                placeholder="রোগীর তালিকা থেকে খুঁজুন"
                lightTheme
                onChangeText={search => setsearch(search)}
                value={search}
            />
            <ScrollView>
                {result.map(a => { 
                    if (!a.name.includes(search)) {
                        return <></>;
                    }
                    return (  
                        <View >
                            <Card>
                                <View style={styles.cardContainer}>
                                    <View>
                                        <Card.Title>{a.name}</Card.Title>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <Button
                                                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                                title='Profile'
                                                onPress={() => navigation.navigate('Profile', { patient_id: a.id })}
                                            />

                                            <Button
                                                buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green" }}
                                                title='Call'
                                                color="#f194ff"
                                                onPress={() => { call(a.args).catch(console.error) }} />
                                        </View>


                                    </View>
                                    <Card.Divider />
                                    <View>   
                                        <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={{ uri: a.image, scale: 1 }} />
                                    </View>
                                </View>
                            </Card>
                        </View>);
                })} 
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
