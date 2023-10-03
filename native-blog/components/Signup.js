import React,{useState} from 'react';
import { Text, View, StyleSheet, Image,Button } from 'react-native';
import Background from './Background'
import InputField from './InputField';
import axios from 'react-native-axios';
import {apiUrl} from './Config'
import Btn from './Btn';
export default function Signup({navigation}) {
  const regex = /^[a-z 0-9 A-Z .\- _]+@[a-z]+\.[a-z]{2,3}$/;
  const [name,setName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [confirmPassword,setConfirmPassword]=useState();
  //Error
  const [nameError,setNameError]=useState();
  const [emailError,setEmailError]=useState();
  const [passwordError,setPasswordError]=useState();
  const [confirmPasswordError,setConfirmPasswordError]=useState()
  const checkName=(text)=>{
    setName(text)
    if(!name){
      setNameError("")
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
  const checkConfirmPassword=(text)=>{
    setConfirmPassword(text);
    if (password !== text) {
      setConfirmPasswordError("Password miss match.");
    } else {
      setConfirmPasswordError("");
    }
  }
  const handleSignUp=async()=>{
    if (validateData(name, email, password, confirmPassword)){
      const jsonData={
        name: name,
        email: email,
        password: password,
        password2:confirmPassword,
      }
     await axios.post(`${apiUrl}api/register`,jsonData)
     .then((response)=>{
       console.log(response.data)
       navigation.navigate('Signin')
     })
     .catch((error)=>{
       console.log(error)
     })
    }
    
    
  }
function validateData(name, email, password, conformPassword) {
    if (!name) {
      setNameError("Name field should not empty.");
      return false;
    } else if (!email) {
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
    } else if (!conformPassword) {
      setConfirmPasswordError("Conform Password field should not empty.");
      return false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Conform Password field should not matched.");
      return false;
    } else {
      return true;
    }
  }
  
  return (
    <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Signup</Text>
      <Text style={{fontSize:25,fontWeight:'bold',color:'white'}}>Wellcome to Blog App</Text>
    </View>
    <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:40,marginTop:100,paddingHorizontal:70}}>
    
     <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginVertical:15}}>Create an Account</Text>
    <InputField placeholder="User Name" onChangeText={(text)=>checkName(text)} />
    <Text style={styles.errors}>{nameError}</Text>
    <InputField placeholder="Email" keyboardType={'email-address'} onChangeText={(text)=>checkEmail(text)} />
    <Text style={styles.errors}>{emailError}</Text>
    <InputField placeholder="Password" secureTextEntry={true} onChangeText={(text)=>checkPassword(text)} />
    <Text style={styles.errors}>{passwordError}</Text>
    <InputField placeholder="Confirm-Password" secureTextEntry={true} onChangeText={(text)=>checkConfirmPassword(text)}/>
    <Text style={styles.errors}>{confirmPasswordError}</Text>
    <Btn textColor="white" bgColor="blue" btnLabel="Signup" callEvent={handleSignUp}/>
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
    marginTop:50,
  },
  errors:{
    color:'red',
    marginHorizontal:20,
  },
});
