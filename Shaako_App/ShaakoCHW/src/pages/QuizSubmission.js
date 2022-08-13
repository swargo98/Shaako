import React from "react";
import { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry, ScrollView } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Svg, { Ellipse } from "react-native-svg";

function QuizSubmission({ route, navigation }) {
	let { submission_id } = route.params;
	let [result, setresult] = useState([])
	let [quiztitle, setquiztitle] = useState('')
	let [cnt, setcnt] = useState(0)
	let [tot, settot] = useState(0)
	
	useEffect(() => {
		getData()
	}, [])
	let getData = async () => {
		console.log('====================================')
		let tok = await AsyncStorage.getItem('token')
		let response = await fetch(global.ip + '/chw/getQuizSubmission', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'TOKEN ' + tok
			},
			body: JSON.stringify({ 'submission_id': submission_id })
		})
		console.log("here")
		let d = await response.json()
		console.log(d)
		setresult(d.ret)
		setquiztitle(d.quiz_name)
		setcnt(d.cnt)
		settot(d.tot)
	}
	return (
		<View style={styles.container}>
			<Navbar></Navbar>
			<ScrollView>

				<View style={styles.loremIpsum3Row}>
					<Text style={styles.loremIpsum3}>
						কুইজের নাম: {quiztitle}
					</Text>
					<Text style={styles.স্কোর৫১০}>স্কোর: {cnt}/{tot}</Text>
				</View>

				{result.map(a => {
					return (
						<View style={styles.rect}>
							<Text style={styles.loremIpsum}>
								প্রশ্ন: {a.question}
							</Text>
							<View style={styles.ellipseRow}>
								<Svg viewBox="0 0 100 100" style={styles.ellipse}>
									<Ellipse
										stroke="rgba(230, 230, 230,1)"
										strokeWidth={0}
										fill={a.correct==1?"rgba(9,115,33,1)":(a.chosen==1?"rgba(255,87,87,1)":"rgba(255,255,255,1)")}
										cx={50}
										cy={50}
										rx={50}
										ry={50}
									></Ellipse>
								</Svg>
								<Text style={styles.অপশন}>{a.option1}</Text>
							</View>
							<View style={styles.ellipse1Row}>
								<Svg viewBox="0 0 100 100" style={styles.ellipse1}>
									<Ellipse
										stroke="rgba(230, 230, 230,1)"
										strokeWidth={0}
										fill={a.correct==2?"rgba(9,115,33,1)":(a.chosen==2?"rgba(255,87,87,1)":"rgba(255,255,255,1)")}
										cx={50}
										cy={50}
										rx={50}
										ry={50}
									></Ellipse>
								</Svg>
								<Text style={styles.অপশন}>{a.option2}</Text>
							</View>
							<View style={styles.ellipse2Row}>
								<Svg viewBox="0 0 100 100" style={styles.ellipse2}>
									<Ellipse
										stroke="rgba(230, 230, 230,1)"
										strokeWidth={0}
										fill={a.correct==3?"rgba(9,115,33,1)":(a.chosen==3?"rgba(255,87,87,1)":"rgba(255,255,255,1)")}
										cx={50}
										cy={50}
										rx={50}
										ry={50}
									></Ellipse>
								</Svg>
								<Text style={styles.অপশন}>{a.option3}</Text>
							</View>
							<View style={styles.ellipse3Row}>
								<Svg viewBox="0 0 100 100" style={styles.ellipse3}>
									<Ellipse
										stroke="rgba(230, 230, 230,1)"
										strokeWidth={0}
										fill={a.correct==4?"rgba(9,115,33,1)":(a.chosen==4?"rgba(255,87,87,1)":"rgba(255,255,255,1)")}
										cx={50}
										cy={50}
										rx={50}
										ry={50}
									></Ellipse>
								</Svg>
								<Text style={styles.অপশন}>{a.option4}</Text>
							</View>
						</View>
					);
				})}



			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "rgba(112,245,177,1)"
	},
	rect: {
		width: 339,
		height: 258,
		backgroundColor: "rgba(198,218,208,1)",
		marginTop: "5%",
		marginLeft: 11
	},
	loremIpsum: {
		fontFamily: "roboto-regular",
		color: "#121212",
		fontSize: 16,
		marginTop: 31,
		marginLeft: 14
	},
	ellipse: {
		width: 21,
		height: 21
	},
	ellipseRow: {
		height: 21,
		flexDirection: "row",
		marginTop: 33,
		marginLeft: 14
	},
	ellipse1: {
		width: 21,
		height: 21
	},
	ellipse1Row: {
		height: 21,
		flexDirection: "row",
		marginTop: 11,
		marginLeft: 14
	},
	ellipse2: {
		width: 21,
		height: 21
	},
	অপশন: {
		fontFamily: "roboto-regular",
		color: "#121212",
		marginLeft: 9,
		marginTop: 3
	},
	ellipse2Row: {
		height: 21,
		flexDirection: "row",
		marginTop: 12,
		marginLeft: 14,
		marginRight: 239
	},
	ellipse3: {
		width: 21,
		height: 21
	},
	ellipse3Row: {
		height: 21,
		flexDirection: "row",
		marginTop: 14,
		marginLeft: 14,
		marginRight: 239
	},
	loremIpsum3: {
		fontFamily: "roboto-regular",
		color: "#121212"
	},
	স্কোর৫১০: {
		fontFamily: "roboto-regular",
		color: "#121212",
		marginLeft: "30%"
	},
	loremIpsum3Row: {
		height: 18,
		flexDirection: "row",
		marginTop: "10%",
		marginLeft: "5%",
		marginRight: "5%",

	}
});

export default QuizSubmission;
