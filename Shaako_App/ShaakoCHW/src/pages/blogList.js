import React from "react";
import { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry,ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

const BlogList = ({ navigation }) => {
    let [result, setresult] = useState([]);
    let [sup_image, setsup_image] = useState(null);
    let sup_id = 0;
    // let sup_id = 26;

    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        sup_id = await AsyncStorage.getItem('sup_id');
        console.log(sup_id)
        console.log(await AsyncStorage.getItem('token'))
        let tok = await AsyncStorage.getItem('token')
        console.log(tok)
        let response = await fetch(global.ip + '/CHW/getLessonList', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(sup_id)
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
            <Navbar></Navbar>
            <ScrollView>

            {result.map(a => {
                return (
                    <View >
                        <Card>
                            <Card.Title>{a.title}</Card.Title>
                            <Card.Divider />
                            <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2, alignSelf: 'center' }} source={sup_image} />
                            <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', }}>
                                {a.supervisor_name}
                            </Text>
                            <Text style={{ fontSize: 17, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>
                                {a.upload_time}
                            </Text>
                            <Button
                                icon={<Icon name='code' color='#ffffff' />}
                                buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                title='পড়ুন' onPress={() => navigation.navigate('BlogPost', { lesson_id: a.id })} />
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

export default BlogList;
