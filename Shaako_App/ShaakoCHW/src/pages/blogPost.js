import React from "react";
import LoginScreen from "react-native-login-screen";
// import { View, Text, StyleSheet, Image, AppRegistry } from "react-native";
import MaterialButtonViolet from "./../../components/MaterialButtonViolet";
import Navbar from "./../../components/Navbar";
import MaterialCardWithoutImage from "../../components/MaterialCardWithoutImage";
import MaterialButtonWithShadow from "../../components/MaterialButtonWithShadow";

// import { Card, ListItem, Button, Icon, Header } from 'react-native-elements';
import blog from "./../../assets/blog.json";
import HTMLView from 'react-native-htmlview';
import styled from 'styled-components';
import { Image} from "react-native";

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
`;
const Author = styled.Text`
  font-size: 15px;
  font-style: italic;
  margin-bottom: 10px;
`;

const renderNode = (node, index, siblings, parent, defaultRenderer) => {
    if (node.name == 'img') {
        const a = node.attribs;
        return ( <Image style={{ width: 300, height: 300 }} source={{uri: node.attribs.src }}/> );
    }
};

const BlogPost = ({ Navigate }) => {
    console.log(blog);
    return (
        <MainContentView>
            <Container>
                <Title>{blog.title}</Title>
                <Author>Author: {blog.author}</Author>
                <HTMLView value={blog.content} />
            </Container>
        </MainContentView>
    );
}

export default BlogPost;
