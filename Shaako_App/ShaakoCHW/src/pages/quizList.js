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
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

const QuizList = ({ navigation }) => {
    let [result, setresult] = useState([]);
    let [pastquiz, setpastquiz] = useState([]);
    let [sup_image, setsup_image] = useState(null);
    let sup_id = 0;
    let chw_id = 0;
    useEffect(() => {
        getContents()
        getPastQuiz()
    }, [])
    let getPastQuiz = async () => {
        sup_id = await AsyncStorage.getItem('sup_id');
        sup_id = JSON.parse(sup_id)

        chw_id = await AsyncStorage.getItem('chw_id');
        chw_id = JSON.parse(chw_id)

        let tok = await AsyncStorage.getItem('token');
        tok = JSON.parse(tok)

        console.log(chw_id)
        let response = await fetch(global.ip + '/CHW/getPastQuiz', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(chw_id)
        })
        let d = await response.json()
        for (let i = 0; i < d.length; i++) {
            // set d[i] in pastquiz array
            console.log(d[i])
            setpastquiz(prevArray => [...prevArray, d[i]]);
        }
    }
    let getContents = async () => {

        chw_id = await AsyncStorage.getItem('chw_id');
        chw_id = JSON.parse(chw_id)

        sup_id = await AsyncStorage.getItem('sup_id');
        sup_id = JSON.parse(sup_id)

        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)

        let response = await fetch(global.ip + '/supervisor/getQ', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ sup_id: sup_id, chw_id: chw_id })
        })
        let d = await response.json()
        setresult([])
        for (let i = 0; i < d.length; i++) {
            let now = d[i]
            console.log(now.id + " " + now.title + " " + now.supervisor_name + " " + now.upload_time)
            setresult(prevArray => [...prevArray, now]);
        }

        let response2 = await fetch(global.ip + '/organization/image/supervisor', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(sup_id)
        })
        // let result = stackSizeSync();
        // console.log(result)

        //take image respone from bufferIO
        let image = await response2.blob()
        //convert to base64
        let image64 = await image.arrayBuffer()
        //convert to base64
        let image64base64 = await btoa(String.fromCharCode.apply(null, new Uint8Array(image64)))
        //convert to url
        let imageurl = `data:image/png;base64,${image64base64}`
        //push to array
        setsup_image(imageurl)
    }

    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>

                {result.map(a => {
                    return (
                        <View >
                            <Card>
                                {!a.played &&
                                    <View style={styles.circle}></View>
                                }
                                <Card.Title ><Text style={{ fontWeight: 'bold' }}>{a.title}</Text></Card.Title>
                                <Card.Divider />
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>


                                    <View style={{ flexDirection: "column" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIconsIcon
                                                name="lead-pencil"
                                                size={30}
                                            ></MaterialCommunityIconsIcon>

                                            <Text style={{ fontSize: 18, }}>    {a.supervisor_name}{'\n'} </Text>
                                        </View>

                                        <View style={{ flexDirection: "row" }}>
                                            <MaterialCommunityIconsIcon
                                                name="calendar-check"
                                                size={30}
                                            ></MaterialCommunityIconsIcon>
                                            <Text style={{ fontSize: 18, }}>    {a.upload_time}{'\n'} </Text>
                                        </View>


                                    </View>


                                    <View>
                                        <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2, alignSelf: 'center' }} source={{ uri: sup_image, scale: 1 }} />
                                    </View>

                                </View>


                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='শুরু করুন' onPress={() => navigation.navigate('Quiz', { id: a.id })} />
                            </Card>
                        </View>);
                })}
                <View >
                    <Card style={styles.submission}>
                        <Card.Title>পূর্ববর্তী সাবমিশন দেখুন</Card.Title>
                    </Card>
                </View>

                {pastquiz.map(a => {
                    return (
                        <View >
                            <Card>
                                <Card.Title>{a.title}</Card.Title>
                                <Card.Divider />
                                {/* <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2, alignSelf: 'center' }} source={sup_image} />
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', }}>
                                    {a.supervisor_name}
                                </Text> */}
                                <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>
                                    {a.upload_date}
                                </Text>
                                <Button
                                    icon={<Icon name='code' color='#ffffff' />}
                                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                    title='দেখুন' onPress={() => navigation.navigate('QuizSubmission', { submission_id: a.submission_id })} />
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
    circle: {
        width: 10, // this should be a "props"-value in future
        height: 10, // this should be a "props"-value in future
        borderRadius: 10 / 2,
        backgroundColor: 'red',
        marginTop: -18,
        marginLeft: -18
    }

});

export default QuizList;
