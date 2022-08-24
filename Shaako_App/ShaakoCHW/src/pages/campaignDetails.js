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
import { CheckBox } from '@rneui/themed'
import call from 'react-native-phone-call'
const CampaignDetails = ({ route, navigation }) => {
    let { campaign_id } = route.params;
    let [result, setresult] = useState([]);
    let [searchtext, setsearchtext] = useState('');
    useEffect(() => {
        getContents()
    }, [])

    let getContents = async () => {
        

        if (navigator.geolocation) {
            // navigator.geolocation.getCurrentPosition(getCoordinates, handelLocationError);
      
            navigator.geolocation.getCurrentPosition((position) => {
              setCoordinates({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
      
              setAddressVisiblitly(true);
            });

            console.log('came here')
      
          } else
            console.log("Geolocation is not supported by this browser.");

        let chw_id = await AsyncStorage.getItem('chw_id')
        chw_id = JSON.parse(chw_id)

        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)

        // console.log(tok)
        let response = await fetch(global.ip + '/CHW/Campaign/getUnenrolledPatient', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify({ 'campaign_id': campaign_id, 'chw_id': chw_id })
        })
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
        // console.log(d)
        // console.log("etuku")
    }

    let addClicked = async (a) => {
        console.log("enroll "+a.id)
        let chw_id = await AsyncStorage.getItem('chw_id')
        chw_id = JSON.parse(chw_id)
        
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)

        let response = await fetch(global.ip + '/CHW/enrollCHW', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
			},
			body: JSON.stringify({ 'chw_id':chw_id,'campaign_id':campaign_id,'patient_id': a.id })
		})
		let data = await response.json()
		console.log(data)
        // delete from result if id=a.id
        let temp=[]
        for(let i=0;i<result.length;i++){
            if(result[i].id!=a.id){
                temp.push(result[i])
            }
        }
        setresult(temp)
    }

    let searchFilterFunction = async (text) => {
        console.log("text = "+text)
        setsearchtext(text)
    }
    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <SearchBar
                placeholder="রোগীর তালিকা থেকে খুঁজুন"
                lightTheme
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                value={searchtext}
            />
            <ScrollView>
                {result.map(a => {
                    if(!a.name.includes(searchtext))
                        return (<></>);
                    return (
                        // check if a.name contains searchtext
                        
                        <View>
                            <Card>
                                <View style={styles.cardContainer}>
                                    <View style={{ alignItems: 'flex-start' }}>
                                        <Card.Title>রোগীর নাম: {a.name}</Card.Title>
                                        <View style={{ flex: 1, flexDirection: "row" }}>
                                            <Button
                                                buttonStyle={{ borderRadius: 10, marginRight: 0, marginBottom: 0, backgroundColor: "#56bfab" }}
                                                title='যুক্ত করুন'
                                                onPress={() => addClicked(a)} />
                                        </View>


                                    </View>

                                    <View>
                                        <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={{ uri: a.image, scale: 1 }} />
                                    </View>
                                </View>
                            </Card>
                        </View>
                    );
                })}
            </ScrollView>

            {/* <ScrollView>
                <View >
                    <Card>
                        <View style={styles.cardContainer}>
                            <View style={{ alignItems: 'flex-start' }}>
                                <Card.Title>Touhid Rahman Daddy</Card.Title>
                                <View style={{ flex: 1, flexDirection: "row" }}>
                                    <Button
                                        buttonStyle={{ borderRadius: 10, marginLeft: 10, marginRight: 0, marginBottom: 0, backgroundColor: "green" }}
                                        title='Call'
                                        color="#f194ff"
                                        onPress={() => { call(args).catch(console.error) }} />

                                    <CheckBox
                                        center
                                        title="ক্যাম্পেইন সম্পন্ন"
                                    // checked={check1}
                                    />
                                </View>


                            </View>

                            <View>
                                <Card.Image style={{ width: 60, height: 60, borderRadius: 60 / 2 }} source={require("./../../assets/logo.png")} />
                            </View>
                        </View>
                    </Card>
                </View>


            </ScrollView> */}
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

    text: {
        fontWeight: "bold",
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10,
        borderRadius: 10
    }

});

export default CampaignDetails;
