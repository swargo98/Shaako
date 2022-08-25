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

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CampaignList = ({ navigation }) => {
    let [result, setresult] = useState([]);
    let sup_id = 0;

    useEffect(() => {
        getContents()
    }, [])



    let getContents = async () => {
        
        let chw_id = await AsyncStorage.getItem('chw_id');
        chw_id = JSON.parse(chw_id)
        
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)

        console.log(tok)
        let response = await fetch(global.ip + '/CHW/getAllCampaigns', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(chw_id)
        })
        let d = await response.json()
        console.log(d)
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id + " " + now.title + " " + now.campaign_details + " " + now.start_date)
            setresult(prevArray => [...prevArray, now]);
        }
        console.log("etuku")
    }

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>

                {result.map(a => {
                    return (
                        <View >
                            <Card>
                                <Card.Title style={{backgroundColor: '#a3e6d9', fontSize: 22}}>{a.title}</Card.Title>
                                <Card.Divider />
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold' }}>
                                    বিবরণ: {a.campaign_details}
                                </Text>
                                <Card.Divider />
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', }}>
                                    সেবা নিয়েছেন: {a.count}
                                </Text>
                                <Card.Divider />
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', }}>
                                    সময়সীমা: {a.end_date}
                                </Text>
                                <Card.Divider />
                                <Button
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='নতুন যুক্ত করুন' onPress={() => navigation.navigate('CampaignDetails', { campaign_id: a.id })} />
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

});

export default CampaignList;
