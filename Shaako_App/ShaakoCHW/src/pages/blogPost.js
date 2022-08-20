import React from "react";
import { useState, useEffect } from "react";
import LoginScreen from "react-native-login-screen";
// import { View, Text, StyleSheet, Image, AppRegistry } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";
import { View, Text, StyleSheet, AppRegistry, ScrollView } from "react-native";

// import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
// import blog from "./../../assets/blog.json";
import HTMLView from 'react-native-htmlview';
import styled from 'styled-components';
import { Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'

const MainContentView = styled.ScrollView`
    padding: 10px;   
`;
const Container = styled.View`
  flex: 1;
  background-color: white;
  margin: 20px;
`;
const Title = styled.Text`
  color: palevioletred;
  font-size: 22px;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
`;
const Author = styled.Text`
  font-size: 15px;
  font-style: italic;
  margin-bottom: 10px;
  text-align: center;
`;



const BlogPost = ({ route, navigation }) => {

    let { lesson_id } = route.params;
    let [blog, setblog] = useState(null);

    useEffect(() => {
        getLesson()
    }, [])
    const renderNode = (node, index, siblings, parent, defaultRenderer) => {
        if (node.name == 'img') {
            const a = node.attribs;
            return (<Image style={{ width: 300, height: 300 }} source={{ uri: node.attribs.src }} />);
        }
    };
    let getLesson = async () => {
        let tok = await AsyncStorage.getItem('token')
        tok = JSON.parse(tok)
        
        let response = await fetch(global.ip + '/supervisor/getMyContent', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'TOKEN ' + tok
            },
            body: JSON.stringify(lesson_id)
        })
        let d = await response.json()
        console.log(d)
        let now = d
        // console.log(now.title + " " + now.content + " " + now.author + " " + now.upload_time)
        setblog(now);
    }
    return (
        <View style={styles.container}>
            <Navbar navigation={navigation}></Navbar>
            <ScrollView>
                {/* <MainContentView> */}

                <Container>
                    <Title>{blog?.title}</Title>
                    <Author>Author: {blog?.author}</Author>
                    <Author>Date: {blog?.upload_time}</Author>
                    <HTMLView value={blog?.content} renderNode={renderNode} />
                </Container>
                {/* </MainContentView> */}
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // flexDirection: "column",
        // backgroundColor: "#41cca6"
    },

    // posts: {
    //     flex: 1,
    //     flexDirection: "row"
    // },

});
export default BlogPost;
