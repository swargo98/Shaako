import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function MaterialFixedLabelTextbox(props) {
    let handle = (e) => {
        console.log(e.nativeEvent.text)
    }
  return (
    <View style={[styles.container, props.style]}>
      <TextInput style={styles.inputStyle} onChange={handle}></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 0,
  },
  label: {
    fontSize: 20,
    lineHeight: 16,
    paddingTop: 8,
    paddingBottom: 10,
    color: "#000",
    opacity: 0.5,
    alignSelf: "flex-start"
  },
  inputStyle: {
    color: "#000",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 10
  }
});

export default MaterialFixedLabelTextbox;
