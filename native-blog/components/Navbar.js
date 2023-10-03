import React,{useEffect,useState,useReducer} from 'react'
import { Text, View, StyleSheet,TouchableOpacity,Image,Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Notification from './Notification'
//import DetailNavigation from './DetailNavigation';
//import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import Signin from './Signin'
import Signup from './Signup';
import AddBlog from './AddBlog';
import Details from './Details'
import UpdateBlog from './UpdateBlog';
import UserProfile from './UserProfile';
import UpdateProfilePicture from './UpdateProfilePicture';
import ChangePassword from './ChangePassword';
import Logout from './LogOut';
// import UpdateBlog from './UpdateBlog';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {createStackNavigator} from '@react-navigation/stack';




const Stack=createStackNavigator()
const Tab = createBottomTabNavigator();
const HomeNavigation=()=>{
  return(
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
    <Stack.Screen name="Details" component={Details} options={{headerShown:false}}/>
    <Stack.Screen name="UpdateBlog" component={UpdateBlog} options={{headerShown:false}}/>
   </Stack.Navigator>
   
  )
}
const UserNavigation=()=>{
  return(
    <Stack.Navigator>
    <Stack.Screen name="User Profile" component={UserProfile} options={{headerShown:false}}/>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
    <Stack.Screen name="AddBlog" component={AddBlog} options={{headerShown:false}}/>
    <Stack.Screen name="UpdateProfilePicture" component={UpdateProfilePicture} options={{headerShown:false}}/>
    <Stack.Screen name="ChangePassword" component={ChangePassword} options={{headerShown:false}}/>
   </Stack.Navigator>
   
  )
}
export default function Navbar(){
  const [isToken,setIsToken]=useState(false);
  const [update,forceUpdate]=useReducer(x=>x+1,0);
  const retriveToken=async ()=>{
    try{
      const token=await AsyncStorage.getItem('my-key');
      //Alert.alert(token)
      if(token!==null){
        setIsToken(true);  
      }
      if(token===null){
        setIsToken(false)
      }
     forceUpdate()
   }catch(error){
   console.log(error)
 }
  }
  useEffect(()=>{
    retriveToken();
     
  },[update])
  return(
<NavigationContainer>
<Tab.Navigator style={styles.navbar} screenOptions={{headerShown:false}}>
   <Tab.Screen name="Home" component={HomeNavigation} options={{
     tabBarIcon:()=>(
       <Image style={styles.image}
       source={require('../assets/homeIcon.jpg')}
       />
     )
   }}/>
   {isToken ? <Tab.Screen name="Notification" component={Notification} 
    options={{
     tabBarIcon:()=>(
       <Image style={styles.image}
       source={require('../assets/notification.png')}
       />
     )
   }}/>:
   <Tab.Screen name="Signin" component={Signin} 
    options={{
     tabBarIcon:()=>(
       <Image style={styles.image}
       source={require('../assets/signin.png')}
       />
     )
   }}/>
   }
  {isToken ?  <Tab.Screen name="" component={AddBlog} 
    options={{
     tabBarIcon:()=>(
       <Image style={styles.addBlog}
       source={require('../assets/AddIcon.png')}
       />
     )
   }}/>:null}
  {isToken ?   <Tab.Screen name="Logout" component={Logout} 
  initialParams={{setIsToken:setIsToken}}
    options={{
     tabBarIcon:()=>(
       <Image style={styles.image}
       source={require('../assets/logout.png')}
       />
     )
   }}/>:<Tab.Screen name="Signup" component={Signup} 
    options={{
     tabBarIcon:()=>(
       <Image style={styles.image}
       source={require('../assets/signup.png')}
       />
     )
   }}/>}
    <Tab.Screen name="User" component={UserNavigation} 
    options={{
     tabBarIcon:()=>(
       <Image style={styles.image}
       source={require('../assets/user.png')}
       />
     )
   }}/>
</Tab.Navigator>
</NavigationContainer>
    // <View style={style.navbar}>
    // <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
    // <Text>Home</Text>
    // </TouchableOpacity>
    //  <TouchableOpacity onPress={()=>navigation.navigate('Details')}>
    // <Text>Details</Text>
    // </TouchableOpacity>
    // </View>
  )
}
const styles=StyleSheet.create({
   navbar:{
   position:'absolute',
    bottom:25,
    elevation:0,
    backgroundColor:'#ffffff',
    borderRadious:25,
    height:50, 
},
  image:{
height:30,
width:30,
borderRadius:50
  },
addBlog:{
height:60,
width:60,
borderRadius:50,
marginBottom:15,
}
})