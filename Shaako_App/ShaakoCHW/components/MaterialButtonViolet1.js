import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function MaterialButtonViolet1(props,{ navigation }) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress={props.clicked}>
      <Text style={styles.পাঠ৫}>পাঠ{"\n"}{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 2,
    minWidth: 88,
    paddingLeft: 16,
    paddingRight: 16
  },
  পাঠ৫: {
    color: "#fff",
    fontSize: 31,
    textAlign: "center"
  }
});

export default MaterialButtonViolet1;
