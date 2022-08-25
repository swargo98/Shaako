import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

function CupertinoButtonInfo2(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]}>
      <Text style={styles.buttonHelloWorld} onPress={props.handleClick}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(120,125,130,1)",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    // borderRadius: 5,
    paddingLeft: 16,
    paddingRight: 16
  },
  buttonHelloWorld: {
    color: "#fff",
    fontSize: 13,
    fontStyle: "italic"
  }
});

export default CupertinoButtonInfo2;
