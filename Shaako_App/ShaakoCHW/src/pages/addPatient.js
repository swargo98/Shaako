import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

import { Card, ListItem, Button, Icon, Header, Input } from 'react-native-elements'
// import DatePicker from 'react-native-date-picker'

// Ref: https://reactnativeelements.com/docs/2.3.2/input#label

const AddPatient = ({ Navigate }) => {
    return (
        <View style={styles.container}>
            <View >
                <Header
                    leftComponent={{ icon: 'menu', color: '#fff' }}
                    centerComponent={{ text: 'রোগী যোগ করুন', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View>

            <View style={{ alignItems: 'center', padding: 10 }} >
                <View style={styles.FormData}>
                    <Input
                        label="রোগীর নাম"
                    />

                    <Input
                        label="মোবাইল নাম্বার"
                    />

                </View>
            </View>
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

    FormData: {
        backgroundColor: "white",
        width: "80%",
        padding: 10,
    }

});

export default AddPatient;
