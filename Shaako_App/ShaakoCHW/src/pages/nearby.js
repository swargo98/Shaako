import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image, Dimensions } from "react-native";
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

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

export default function Nearby({ navigation }) {
    let [latitude, setlatitude] = useState('23.7256564');
    let [longitude, setlongitude] = useState('90.3915638');
    let [dummy, setdummy] = useState(false);
    
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
    
    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>

            <MapView
                style={styles.map}
                initialCamera={{
                    center: { latitude: latitude, longitude: longitude },
                    pitch: 0,
                    zoom: 18,
                    heading: 0,
                    altitude: 1000,
                }}
                provider = { PROVIDER_GOOGLE }
                showsUserLocation={true}
                showsMyLocationButton={true}
                showsTraffic={true}
                mapType="terrain"
                showsBuildings={false}
                showsIndoors={false}
                // annotations={markers}
                loadingEnabled={true}
                // customMapStyle={mapStyle}
            />


        </View>
    );
}
var mapStyle = [
    {
      "featureType": "poi.business",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    rect: {
        top: 0,
        left: 0,
        width: "100%",
        height: 232,
        position: "absolute",
        backgroundColor: "rgba(112,245,177,1)",
        flexDirection: "row"
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
});

