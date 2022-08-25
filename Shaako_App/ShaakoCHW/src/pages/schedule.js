import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Schedule = ({ navigation }) => {
    let [result, setresult] = useState([]);
    useEffect(() => {
        onDateChange()
    }, [])

    let onDateChange = async (date) => {
        setresult([])
        console.log(date)
        let dd = date.toString()

        // find date in dd-MM-yyyy form
        let date1 = dd.split(" ")
        let date2 = date1[2] + "-" + date1[1] + "-" + date1[3]
        console.log(date2)

        let chw_id = await AsyncStorage.getItem('chw_id');
        chw_id = JSON.parse(chw_id)
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)

        let response = await fetch(global.ip + '/CHW/getSchedule', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ chw_id: chw_id, date: date2 })
        })
        let d = await response.json()
        console.log(d)
        

        for (let i = 0; i < d.length; i++) {
            let now = d[i]

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
            console.log(1)
            let sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
            await sleep(1000);
            console.log(2)

            setresult(prevArray => [...prevArray, now]);
        }


    }
    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            {/* <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'শিডিউল', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View> */}
            <View style={{ alignItems: 'center' }}>
                {/* <Text>তারিখ নির্বাচন করুন</Text> */}
                <Card>
                    {/* https://www.npmjs.com/package/react-native-calendar-picker */}
                    <CalendarPicker weekdays={['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি']}
                        months={['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর']}
                        previousTitle='পূর্ববর্তী'
                        nextTitle='পরবর্তী'
                        selectedDayColor='#2578f5'
                        onDateChange={onDateChange}
                    />
                </Card>
            </View>
            <ScrollView>
                {result.map(a => {
                    return (
                        <View >
                            <Card>
                                <View style={styles.cardContainer}>
                                    <View>
                                        <Text>রোগী: {a.name}</Text>
                                        <Text></Text>
                                        <Text>ঠিকানা: {a.address}</Text>
                                        <Text> </Text>
                                        <Text>সর্বশেষ ভিজিট: {a.last_visit}</Text>
                                        <Text> </Text>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <Button
                                                buttonStyle={{ borderRadius: 10, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                                                title='দেখুন'
                                                onPress={() => navigation.navigate('Profile', { patient_id: a.id })}
                                            />
                                        </View>


                                    </View>
                                    <Card.Divider />
                                    <View>   
                                        <Card.Image style={{ width: 100, height: 100, borderRadius: 100 / 2 }} source={{ uri: a.image, scale: 1 }} />
                                    </View>
                                </View>
                            </Card>
                        </View>
                    );
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

export default Schedule;
