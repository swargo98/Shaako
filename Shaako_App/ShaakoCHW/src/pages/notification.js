import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

const Notification = ({ Navigate }) => {
    return (
        <View style={styles.container}>
            <View style={styles.rect}></View>
            <View style={styles.materialCardWithoutImageStackRow}>
                <View style={styles.materialCardWithoutImageStack}>
                    <MaterialCardWithoutImage
                        style={styles.materialCardWithoutImage}
                    ></MaterialCardWithoutImage>
                    <Text style={styles.date01012022}>Date : 01.01.2022</Text>
                </View>
                <MaterialButtonWithShadow
                    style={styles.materialButtonWithShadow}
                ></MaterialButtonWithShadow>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row"
    },
    rect: {
        width: 100,
        height: 100,
        backgroundColor: "#E6E6E6",
        marginLeft: 708,
        marginTop: 224
    },
    materialCardWithoutImage: {
        height: 83,
        width: 275,
        position: "absolute",
        left: 0,
        top: 0,
        backgroundColor: "rgba(208,203,203,1)"
    },
    date01012022: {
        top: 56,
        position: "absolute",
        fontFamily: "roboto-regular",
        color: "#121212",
        height: 17,
        width: 245,
        left: 18
    },
    materialCardWithoutImageStack: {
        width: 275,
        height: 83
    },
    materialButtonWithShadow: {
        height: 83,
        width: 100,
        backgroundColor: "rgba(122,110,110,1)"
    },
    materialCardWithoutImageStackRow: {
        height: 83,
        flexDirection: "row",
        flex: 1,
        marginRight: -15,
        marginLeft: -808,
        marginTop: 104
    }
});

export default Notification;
