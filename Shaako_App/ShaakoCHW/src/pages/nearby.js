import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image, Dimensions, TouchableOpacity } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
//import { NativeRouter ,Link } from "react-router-native";
// import MaterialButtonViolet from "../../components/MaterialButtonViolet";
import Navbar from "../../components/Navbar";
import MaterialFixedLabelTextbox from "../../components/MaterialFixedLabelTextbox";
import MaterialButtonViolet1 from "../../components/MaterialButtonViolet1";
import MaterialButtonViolet2 from "../../components/MaterialButtonViolet2";
import MaterialButtonViolet3 from "../../components/MaterialButtonViolet3";
import MaterialButtonViolet from "../../components/MaterialButtonViolet";
import { useState, useEffect } from 'react'
import '../../global.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps'
import { Card, ListItem, Icon, Header } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { render } from "react-dom";

export default function Nearby({ navigation }) {
    let [latitude, setlatitude] = useState(23.7256564);
    let [longitude, setlongitude] = useState(90.3915638);
    let [dummy, setdummy] = useState(false);
    let [details, setdetails] = useState('নিকটবর্তী হাসপাতাল খুঁজুন');
    let [show, setshow] = useState(false);

    useEffect(() => {
        getData()
    }, [])
    let getData = async () => {
        await Permissions.askAsync(Permissions.LOCATION);
        let location = await Location.getCurrentPositionAsync({});
        console.log(location.coords.latitude + " " + location.coords.longitude)
        // Location.
        setlatitude(location.coords.latitude)
        setlongitude(location.coords.longitude)
        setdummy(true)
    }

    mapstyle = [
        {
            "featureType": "administrative",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "visibility": "off"
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.attraction",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.government",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "stylers": [
                {
                    "color": "#f20202"
                },
                {
                    "weight": 5.5
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#78c487"
                },
                {
                    "weight": 1
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "color": "#78c487"
                },
                {
                    "weight": 7.5
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "weight": 5.5
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#f20202"
                },
                {
                    "visibility": "simplified"
                },
                {
                    "weight": 8
                }
            ]
        },
        {
            "featureType": "poi.medical",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#eb0f0f"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.place_of_worship",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.school",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.sports_complex",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        }
    ]
    let clicked = async (e) => {
        console.log(e.nativeEvent)
        let lat = e.nativeEvent.coordinate.latitude
        let long = e.nativeEvent.coordinate.longitude
        let nam = e.nativeEvent.name
        console.log(nam)
        setlatitude(lat)
        setlongitude(long)

        let response = await fetch('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + long + '&zoom=18&addressdetails=1')
        console.log('https://nominatim.openstreetmap.org/reverse?format=json&lat=' + lat + '&lon=' + long + '&zoom=18&addressdetails=0')
        let data = await response.json()
        console.log(data)
        // console.log(data.display_name)

        nam = nam.trim()
        while (nam.charAt(nam.length - 1) == '…') {
            nam = nam.substr(0, nam.length - 1);
        }
        nam = nam.trim()
        while (nam.charAt(nam.length - 1) == '…') {
            nam = nam.substr(0, nam.length - 1);
        }
        let str=data.display_name
        var arr = str.split(',')
        arr.splice(0, 1);
        str=arr.join(',')

        // nam=nam.replace(/(\r\n|\n|\r)/gm, " ")
        let address = data.address

        let s = nam + ', ' + str
        setdetails(s)
        setshow(true)
    }


    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>

            <MapView
                style={styles.map}
                // initialCamera={{
                //     center: { latitude: latitude, longitude: longitude },
                //     pitch: 0,
                //     zoom: 18,
                //     heading: 0,
                //     altitude: 1000,
                // }}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.00122,
                    longitudeDelta: 0.0121,
                    zoom: 20,
                }}

                customMapStyle={mapstyle}
                // provider = { PROVIDER_GOOGLE }
                showsUserLocation={true}
                showsMyLocationButton={true}
                onPoiClick={(e) => clicked(e)}
            />
            {show &&
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={styles.iconButton}>
                        <MaterialCommunityIconsIcon
                            name="close"
                            size={40}
                            alignItems="center"
                            onPress={() => setshow(false)}
                        ></MaterialCommunityIconsIcon>
                    </TouchableOpacity>
                    <Card.Title style={styles.rect}>{details}</Card.Title>
                </View>
            }



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rect: {
        width: "100%",
        height: 125,
        // position: "absolute",
        backgroundColor: "rgba(206, 222, 210,0.8)",
        flexDirection: "row",
        marginBottom: 0
    },
    materialButtonViolet1: {
        height: 127,
        width: "45%",
        backgroundColor: "rgba(61,124,183,1)",
        marginLeft: "0%"
    },
    materialButtonViolet2: {
        height: 127,
        width: "45%",
        backgroundColor: "rgba(225,85,22,1)",
        marginLeft: "10%"
    },
    materialButtonViolet1Row: {
        height: 127,
        flexDirection: "row",
        flex: 1,
        marginRight: 27,
        marginLeft: "6%",
        marginTop: 41
    },
    materialButtonViolet3: {
        height: 43,
        width: "80%",
        marginTop: "70%",
        marginLeft: "10%",
        borderRadius: 10
    },
    materialButtonViolet4: {
        height: 43,
        width: "80%",
        marginTop: 17,
        marginLeft: "10%",
        borderRadius: 10
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    cardContainer: {
        marginTop: -200,
    },
    iconButton: {
        marginLeft: Dimensions.get('window').width - 40
    },
});

