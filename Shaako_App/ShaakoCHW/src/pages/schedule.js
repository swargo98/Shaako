import React from "react";
import LoginScreen from "react-native-login-screen";
import { View, Text, StyleSheet, Image, AppRegistry } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';

const Schedule = ({ navigation }) => {
    let onDateChange = (date) => {
        console.log("here")
        console.log(date)
      }
    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            {/* <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'শিডিউল', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View> */}
            <View style = {{alignItems: 'center'}}>
                {/* <Text>তারিখ নির্বাচন করুন</Text> */}
            <Card>
            {/* https://www.npmjs.com/package/react-native-calendar-picker */}
            <CalendarPicker weekdays={['রবি','সোম','মঙ্গল','বুধ','বৃহঃ','শুক্র','শনি']}
            months={['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর']}
            previousTitle='পূর্ববর্তী'
            nextTitle='পরবর্তী'
            selectedDayColor='#2578f5'
            onDateChange={onDateChange}
        />
            </Card>
            </View>

            <View >
            <Card>
                <Card.Title>HELLO WORLD</Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />
            </Card>
            </View>

            <View >
            <Card>
                <Card.Title>HELLO WORLD2</Card.Title>
                <Card.Divider/>
                <Text style={{marginBottom: 10}}>
                    The idea with React Native Elements is more about component structure than actual design.
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='VIEW NOW' />
            </Card>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#41cca6"
    },

    posts: {
        flex: 1,
        flexDirection: "row"
    },
    
});

export default Schedule;
