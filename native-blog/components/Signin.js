import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Image,Button,TouchableOpacity,Alert } from 'react-native';
import axios from 'react-native-axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
//import * as SecureStore from 'expo-secure-store';
import RNRestart from 'react-native-restart';
import AsyncStorage from '@react-native-community/async-storage';
import Background from './Background';
import {apiUrl} from './Config';
import InputField from './InputField';
import Btn from './Btn'
export default function Signin({navigation}) {
  const regex = /^[a-z 0-9 A-Z .\- _]+@[a-z]+\.[a-z]{2,3}$/;
  //const [logData,setLogData]=useState()
  const [email,setEmail]=useState()
  const [password,setPassword]=useState()
  const [emailError,setEmailError]=useState()
  const [passwordError,setPasswordError]=useState()
  const storToken= (value) =>{
      try{
         AsyncStorage.setItem('my-key', value);
         //Alert.alert('Token Stored successfully')
      }
      catch(e){
       // Alert.alert(e)
       console.log(e)
      }
       }
  const checkEmail=(text)=>{
    setEmail(text)
    if (regex.test(text) === false) {
      setEmailError("Please enter valid email address.");
    } else {
      setEmailError("");
    }
  }
  const checkPassword=(text)=>{
    setPassword(text);
    if (/[0-9]/.test(text) === false) {
      setPasswordError("Password must contain at least one number.");
    } else if (/[a-z]/.test(text) === false) {
      setPasswordError(
        "Password must contain at least one lower case latter."
      );
    } else if (/[A-Z]/.test(text) === false) {
      setPasswordError(
        "Password must contain at least one upper case latter."
      );
    } else if (text.length < 4) {
      setPasswordError("Password length should be gather then 4.");
    } else {
      setPasswordError("");
    }
  }
  const handleSignIn=async()=>{
    if (validateData(email, password)){
      const jsonData={
        email:email,
        password:password
      }
      await axios.post(`${apiUrl}api/login`,jsonData)
     .then((response)=>{    
      //setLogData(typeof(response.status))
      
      storToken(response.data.token);
     // window.location.reload(false);
      //AsyncStorage.setItem('my-key', response.data.token)
      //Alert.alert(response.data.token);
      //RNRestart.restart();
      navigation.navigate('Home')

     })
     .catch((error)=>{
       //console.warn(error)
       Alert.alert("Enter valid cradential!");
       navigation.navigate('Signup')
     })
    }else{
      Alert.alert("All field required.")
    } 
  
  }
  function validateData( email, password) {
    if (!email) {
      setEmailError("Email field should not empty.");
      return false;
    } else if (regex.test(email) === false) {
      setEmailError("This is not a valid Email.");
      return false;
    } else if (!password) {
      setPasswordError("Password field should not empty.");
      return false;
    } else if (password.length < 4) {
      setPasswordError("Password length should be gather then 4.");
      return false;
    } else if (password.length >= 16) {
      setPasswordError("Password length should be less then 16.");
      return false;
    }else {
      return true;
    }
  }
  return (
   <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Signin</Text>
       <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>Wellcome to Blog App</Text>
    </View>
     <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:60,marginTop:100,paddingHorizontal:70}}>
     <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginVertical:15}}>Hello !</Text>
    <InputField placeholder="Email" keyboardType={'email-address'} onChangeText={(text)=>checkEmail(text)} />
    <Text style={styles.errors}>{emailError}</Text>
    <InputField placeholder="Password" secureTextEntry={true} onChangeText={(text)=>checkPassword(text)} />
    <Text style={styles.errors}>{passwordError}</Text>
    <TouchableOpacity style={{alignItems:'flex-end',width:'78%',paddingRight:16,marginBottom:50}}>
    <Text style={{color:'blue',fontWeight:'bold',fontSize:16}}>Forgot Password?</Text>
    </TouchableOpacity>
     <Btn textColor="white" bgColor='blue' btnLabel="Signin" callEvent={handleSignIn}/>
    </View>
     </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width:400,
   
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical:10,
    color:'white',
    marginTop:60,
  },
  errors:{
    color:'red',
    marginHorizontal:20,
  },
});
