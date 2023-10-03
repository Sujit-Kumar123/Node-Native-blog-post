import React,{useState,useEffect,useReducer} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, StyleSheet, Image,Button,Alert } from 'react-native';
import Background from './Background'
import InputField from './InputField';
import Btn from './Btn';
import {apiUrl} from './Config';
import axios from 'react-native-axios';

const Logout=({navigation,route})=>{
  const [user,setUser]=useState([]);
  //const [update,forceUpdate]=useReducer(x=>x+1,0);
 
  const getUser=async()=>{
    const token=await AsyncStorage.getItem('my-key');
    //Alert.alert(token)
    const headers={
         'Authorization': token,
         'Content-Type':'application/json',
      }
    //Alert.alert(apiUrl)
    axios.get(`${apiUrl}api/get_user`,{headers})
    .then((response)=>{
      setUser(response.data)
     // Alert.alert("OK")
    })
    .catch((error)=>{
      Alert.alert(error)
    })
  }
  useEffect(()=>{
    getUser();
  },[])
  const deletTokenFromLocalStorage=async()=>{
    await AsyncStorage.removeItem('my-key')
    forceUpdate()
  }
  const userLogOut=()=>{
    axios.delete(`${apiUrl}api/logout/${user.id}`)
    .then((response)=>{
      Alert.alert(response.data.message)
      deletTokenFromLocalStorage()
      route.params.setIsToken(false)
      //setUser([])
      //AsyncStorage.removeItem('my-key')
      navigation.navigate('Home')
    })
    .catch((error)=>{
      Alert.alert("Logout deny!")
      console.log(error)
    })
  }
 return (
   <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Visit Again</Text>
    </View>
     <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:80,marginTop:100,paddingHorizontal:70}}>
    <Text style={{fontSize:25,fontWeight:'bold',marginRight:30,}}>Hi {user.username}</Text>
     <Btn textColor="white" bgColor='blue' btnLabel="Log out" callEvent={userLogOut}/>
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
});
export default Logout;