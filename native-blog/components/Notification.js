import React,{useState,useEffect} from 'react';
import axios from 'react-native-axios';
import {apiUrl} from './Config'
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
  TextInput,
  Image,
} from 'react-native';

const Notification = () => {
  
  return (
    <View style={styles.container}>
    <SafeAreaView  >
   <ImageBackground source={require("../assets/backGround.png")} style={  {height:"100%",backgroundColor:"rgba(0, 41, 255, 0.7)"}}>
      <Text>Notification</Text>
   </ImageBackground>  
  </SafeAreaView> 
  </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(0, 41, 255, 0.7)",
  },
});

export default Notification;