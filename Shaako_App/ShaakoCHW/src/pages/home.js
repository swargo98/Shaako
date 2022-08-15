import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Button, Image } from "react-native";
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
export default function Home({ navigation }) {
	console.log("ekhaneeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
	let [chw_id, setchw_id] = useState(null)
	let [sup_id, setsup_id] = useState(null)
	let [lesson_count, setLessonCount] = useState(-1)
	let [quiz_count, setQuizCount] = useState(-1)
	
	// let [data2, setdata2] = useState(23)
	// let [data3, setdata3] = useState(34)

	useEffect(() => {
		getData()
	}, [])
	let getData = async () => {
		var c=await AsyncStorage.getItem('chw_id')
		c=JSON.parse(c)
		var d=await AsyncStorage.getItem('sup_id')
		d=JSON.parse(d)
		
		console.log("c="+c)
		console.log("d="+d)
		setchw_id(c)
		setsup_id(d)

		console.log("chw_id="+chw_id)
		console.log("sup_id="+sup_id)

		let response = await fetch(global.ip+'/chw/getNosContent', {
			method: "POST",
			headers: {
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'sup_id':d })
		  })
		  let data = await response.json()
		  console.log(data)

		  setLessonCount(data.lesson_count)
		  setQuizCount(data.quiz_count)

	}
	let handleClick1 = () => {
		navigation.navigate('BlogList')
	}
	let handleClick2 = () => {
		navigation.navigate('QuizList')
	}
	let handleClick3 = () => {
		navigation.navigate('AddPatient')
	}
	return (
		<View style={styles.container}>
			<Navbar navigation={navigation}></Navbar>
			<View>
				<View style={styles.rect}>
					<View style={styles.materialButtonViolet1Row}>
						<MaterialButtonViolet1
							style={styles.materialButtonViolet1}
							text={lesson_count}
							clicked={handleClick1}
						></MaterialButtonViolet1>
						<MaterialButtonViolet2
							style={styles.materialButtonViolet2}
							text={quiz_count}
							clicked={handleClick2}
						></MaterialButtonViolet2>
					</View>
				</View>
			</View>
			<MaterialButtonViolet3
				style={styles.materialButtonViolet3}
				text="চলমান ক্যাম্পেইনসমূহ"
			></MaterialButtonViolet3>
			<MaterialButtonViolet3
				style={styles.materialButtonViolet4}
				text="নিকটবর্তী সহযোগিতা"
			></MaterialButtonViolet3>
			<MaterialButtonViolet3
				style={styles.materialButtonViolet4}
				text="আপনার সুপারভাইজর"
			></MaterialButtonViolet3>
			<MaterialButtonViolet3
				style={styles.materialButtonViolet4}
				text="রোগীর তালিকা"
			></MaterialButtonViolet3>
			<MaterialButtonViolet3
				style={styles.materialButtonViolet4}
				text="নতুন ভিজিট হালনাগাদ"
			></MaterialButtonViolet3>
			<MaterialButtonViolet3
				style={styles.materialButtonViolet4}
				text="নতুন রোগী যুক্ত"
				clicked={handleClick3}
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
	}
});

