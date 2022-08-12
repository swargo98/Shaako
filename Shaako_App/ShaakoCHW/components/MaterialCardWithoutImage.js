import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function MaterialCardWithoutImage(props) {
  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.bodyContent}>
        <Text style={styles.titleGoesHere}>নতুন কুইজ আপ্লোড করা হয়েছে</Text>
      </View>
      <View style={styles.body}></View>
      <View style={styles.actionBody}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "#CCC",
    flexWrap: "nowrap",
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: {
      width: -2,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 3,
    overflow: "hidden"
  },
  bodyContent: {
    padding: 16,
    paddingTop: 24,
    justifyContent: "center"
  },
  titleGoesHere: {
    fontSize: 18,
    color: "#000",
    paddingBottom: 12,
    alignSelf: "flex-start"
  },
  body: {
    padding: 16,
    paddingTop: 8
  },
  actionBody: {
    padding: 8,
    flexDirection: "row"
  }
});

export default MaterialCardWithoutImage;
