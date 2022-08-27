import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView , TouchableOpacity} from "react-native";
import Navbar from "./../../components/Navbar";

import { Card, ListItem, Button, Icon, Header, SearchBar } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CHWProfile = ({ navigation }) => {
    let [result, setresult] = useState('')
    let [image, setimage] = useState(null)

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
        d.ward_union = d.ward_union.replace(/(\r\n|\n|\r)/gm, "");

        console.log(d);
        setresult(d);
        let response2 = await fetch(global.ip + '/CHW/getImage', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(id)
        })

        let image = await response2.blob()
        var reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = function () {
            var base64data = reader.result;
            setimage(base64data)
        }
        // let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        // await sleep(1000);
    }


    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>
                <View >
                    <Card>
                        <View style={{ alignItems: 'center' }}>
                            <Card.Image style={{ width: 160, height: 160, borderRadius: 40 }} source={{ uri: image, scale: 1 }} />
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.title}>{result.name}</Text>
                        </View>
                        <Card.Divider></Card.Divider>
                        <View style={{ margin: 10 }}>
                            <Text style={styles.text}>সাধারণ তথ্যসমূহ</Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>{'\n'}সুপারভাইজার নাম </Text></Text>
                            <Text style={{ fontSize: 16, }}>{result.supervisor_name}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>ইমেইল এড্রেস </Text></Text>
                            <Text style={{ fontSize: 16, }}>{result.email}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>মোবাইল নম্বর</Text></Text>
                            <Text style={{ fontSize: 16, }}>{result.contactNo}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>ঠিকানা</Text></Text>
                            <Text style={{ fontSize: 16, }}>{result.presentAddress}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>কর্মরত এলাকা</Text></Text>
                            <Text style={{ fontSize: 16, }}>{result.ward_union},{result.upazilla_thana},{result.district},{result.division}{'\n'} </Text>
                            <Text><Text style={{ fontWeight: "bold", fontSize: 18, }}>নিয়োগ তারিখ</Text></Text>
                            <Text style={{ fontSize: 16, }}>{result.recruitment_date} </Text>
                        </View>
                        <Card.Divider></Card.Divider>
                        <TouchableOpacity style={styles.loginBtn}>
                            <Text style={{color:'white', fontWeight: "bold", fontSize: 15}}>তথ্য অথবা পাসওয়ার্ড পরিবর্তন</Text>
                        </TouchableOpacity>
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
        fontSize: 16,
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 10
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "10%",
        backgroundColor: "#0c6efc",
    },
});

export default CHWProfile;
