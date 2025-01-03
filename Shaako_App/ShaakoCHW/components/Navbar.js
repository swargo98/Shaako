import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";

function Navbar(props) {
  let handleClickHome = () => {
    props.navigation.navigate('Home');
  }
  let handleClickBell = () => {
    props.navigation.navigate('Notification');
  }
  let handleClickCalendar = () => {
    props.navigation.navigate('Schedule');
  }
  let handleClickProfile = () => {
    props.navigation.navigate('CHWProfile');
  }
  let handleClickLogout = async () => {
    props.navigation.navigate('Auth');
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('organization');
    await AsyncStorage.removeItem('chw_id');
    await AsyncStorage.removeItem('sup_id');
  }

  return (
    <View style={[styles.container]}>
      <View style={styles.leftIconButtonRow}>

        <View style={styles.textWrapper}>
          <Text numberOfLines={1} style={styles.title} onPress={handleClickHome} >
            সাঁকো
          </Text>
        </View>
      </View>
      <View style={styles.leftIconButtonRowFiller}></View>
      <View style={styles.rightIconsWrapper}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIconsIcon
            name="bell"
            style={styles.rightIcon1}
            onPress={handleClickBell}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIconsIcon
            name="calendar"
            style={styles.rightIcon2}
            onPress={handleClickCalendar}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIconsIcon
            name="account"
            style={styles.rightIcon3}
            onPress={handleClickProfile}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialCommunityIconsIcon
            name="logout"
            style={styles.rightIcon3}
            onPress={handleClickLogout}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    width: "100%",
    marginTop: 0,
    backgroundColor: "#41cca6",
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    justifyContent: "space-between",
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 3
  },
  leftIconButton: {
    padding: 11
  },
  leftIcon: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 24
  },
  textWrapper: {
    alignSelf: "flex-end",
    marginLeft: 21,
    marginBottom: -30
  },
  title: {
    fontSize: 20,
    color: "#FFFFFF",
    backgroundColor: "transparent",
    lineHeight: 28
  },
  leftIconButtonRow: {
    flexDirection: "row",
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 3
  },
  leftIconButtonRowFiller: {
    flex: 1,
    flexDirection: "row"
  },
  rightIconsWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
    marginTop: 5
  },
  iconButton: {
    padding: 11
  },
  rightIcon1: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 30,
    marginBottom: -30
  },
  rightIcon2: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 30,
    marginBottom: -30
  },
  rightIcon3: {
    backgroundColor: "transparent",
    color: "#FFFFFF",
    fontSize: 30,
    marginBottom: -30
  }
});

export default Navbar;
