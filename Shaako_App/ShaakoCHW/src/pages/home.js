import React from "react";
import LoginScreen from "react-native-login-screen";
import {View, Text, StyleSheet, Button, Image} from "react-native";
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

export default function Home() {
  let [data1, setdata1] = useState("12")
  // let [data2, setdata2] = useState(23)
  // let [data3, setdata3] = useState(34)

  useEffect(() => { 
      getData()
  }, [])
  let getData = async () => {
    
      console.log(global.ip)
      let response = await fetch(global.ip+'/chw/kichuekta',
      {
          method: "GET",
          headers: {
              'Content-Type': 'application/json',
          },
      })
      let d = await response.json()
      console.log("d "+d)
      setdata1(d)
  }
  return (
    <View style={styles.container}>
      <Navbar></Navbar>
      <View>
        <View style={styles.rect}>
          <View style={styles.materialButtonViolet1Row}>
            <MaterialButtonViolet1
              style={styles.materialButtonViolet1}
              text={data1}
            ></MaterialButtonViolet1>
            <MaterialButtonViolet2
              style={styles.materialButtonViolet2}
            ></MaterialButtonViolet2>
          </View>
        </View>
        {/* <MaterialHeader4 style={styles.materialHeader1}></MaterialHeader4> */}
      </View>
      <MaterialButtonViolet3
        style={styles.materialButtonViolet3}
      ></MaterialButtonViolet3>
      <MaterialButtonViolet3
        style={styles.materialButtonViolet4}
      ></MaterialButtonViolet3>
    </View>
  );
}
// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   materialFixedLabelTextbox: {
//     height: 43,
//     width: 303,
//     borderWidth: 1,
//     borderColor: "#000000",
//     backgroundColor: "rgba(230, 230, 230,0.33)",
//     marginTop: 35,
//     marginLeft: 21
//   }
// });
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rect: {
    top: 0,
    left: 0,
    width: 360,
    height: 232,
    position: "absolute",
    backgroundColor: "rgba(112,245,177,1)",
    flexDirection: "row"
  },
  materialButtonViolet1: {
    height: 127,
    width: 140,
    backgroundColor: "rgba(61,124,183,1)"
  },
  materialButtonViolet2: {
    height: 127,
    width: 137,
    backgroundColor: "rgba(225,85,22,1)",
    marginLeft: 35
  },
  materialButtonViolet1Row: {
    height: 127,
    flexDirection: "row",
    flex: 1,
    marginRight: 27,
    marginLeft: 21,
    marginTop: 41
  },
  materialHeader1: {
    height: 56,
    width: 360,
    position: "absolute",
    top: 0,
    left: 0
  },
  materialButtonViolet3: {
    height: 43,
    width: 280,
    marginTop: "70%",
    marginLeft: 39,
    borderRadius: 10
  },
  materialButtonViolet4: {
    height: 43,
    width: 280,
    marginTop: 17,
    marginLeft: 39,
    borderRadius: 10
  }
});

