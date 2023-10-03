import React,{useState,useEffect} from 'react';
import {View,Text,Image,TouchableOpacity,StyleSheet,SafeAreaView,Alert} from 'react-native';
import Background from './Background';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'react-native-axios';
import {apiUrl} from './Config'


const UserProfile=({navigation})=>{
  const [user,setUser]=useState([]);
  const getUser=async()=>{
    const token=await AsyncStorage.getItem('my-key');
      //Alert.alert(token)
    const headers={
        'Authorization': token,
        'Content-Type':'application/json',
      }
     // Alert.alert(apiUrl);
    axios.get(`${apiUrl}api/get_user`,{headers})
    .then((response)=>{
      setUser(response.data)
      //Alert.alert("OK")
    })
    .catch((error)=>{
      Alert.alert("error")
    })
     } 
  useEffect(()=>{
    getUser();
  })
  return(
    <SafeAreaView>
    <Background>
     <View style={styles.container}>
      <Text style={styles.paragraph}>{user.username}</Text>
      <TouchableOpacity style={styles.profileEdit} onPress={()=>navigation.navigate('UpdateProfilePicture')}>
     <Image style={{height:15,width:15}}
       source={require('../assets/editProfile.png')}
       />
      <Text style={{color:'white',marginLeft:7,fontSize:16,marginTop:-3}}>Edit My Profile</Text></TouchableOpacity>
      <Text style={{color:'white',marginLeft:20,fontSize:16,marginTop:-3}}>{user.email}</Text>
    <TouchableOpacity onPress={()=>navigation.navigate('UpdateProfilePicture')}>
    <Image style={styles.image}
       source={require('../assets/user.png')}
       />
    </TouchableOpacity>
    </View>
    <View style={{backgroundColor:'white',height:730,width:400,marginTop:80}}>
    <View style={{flexDirection:'row',justifyContent: 'space-between',marginHorizontal:70,marginTop:-40}}>
    <View style={styles.blogCount}>
    <Text>50</Text>
    <Text style={{color:'grey',marginTop:5,fontSize:15}}>Blogs</Text>
    </View>
    <View style={styles.commentCount}>
    <Text>100</Text>
     <Text style={{color:'grey',marginTop:5,fontSize:15}}>Comments</Text>
    </View>
    </View>
    <View>
    <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate('Home')} >
    <Text style={{fontSize:18,color:'grey'}}>View Details</Text>
    <Text style={{fontSize:32,marginTop:-10,color:'grey'}}>{">"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate('AddBlog')} >
    <Text style={{fontSize:18,color:'grey'}}>Add Blog</Text>
    <Text style={{fontSize:32,marginTop:-10,color:'grey'}}>{">"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate('UpdateProfilePicture')}>
    <Text style={{fontSize:18,color:'grey'}}>Update Profile</Text>
    <Text style={{fontSize:32,marginTop:-10,color:'grey'}}>{">"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate('ChangePassword')}>
    <Text style={{fontSize:18,color:'grey'}}>Change Password</Text>
    <Text style={{fontSize:32,marginTop:-10,color:'grey'}}>{">"}</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.list} onPress={()=>navigation.navigate('Logout')}>
    <Text style={{fontSize:18,color:'grey'}}>Logout</Text>
    <Text style={{fontSize:32,marginTop:-10,color:'grey'}}>{">"}</Text>
    </TouchableOpacity>
    </View>
   </View>
   
   </Background>
   </SafeAreaView>
)
}
export default UserProfile;
const styles = StyleSheet.create({
  container: {
    width:400, 
  },
  paragraph: {
    margin:24,
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical:10,
    color:'white',
    marginTop:80,
  },
  profileEdit:{
    flexDirection:'row',
    fontWeight: 'bold',
    textAlign: 'left',
    marginHorizontal:24,
    color:'white',
  },
  image:{
height:100,
width:100,
borderRadius:50,
marginLeft:270,
marginTop:-80
  },
  blogCount:{
 height:70,
 width:100,
 backgroundColor:'#E8E8E8',
 alignItems:'center',
 padding:10,
 borderRadius:5,
  },
  commentCount:{
 height:70,
 width:100,
 backgroundColor:'#E8E8E8',
 alignItems:'center',
 padding:10,
 borderRadius:5,
  },
list:{
flexDirection:'row',
justifyContent: 'space-between',
marginHorizontal:11, 
marginTop:8,
backgroundColor:'#E8E8E8',
height:50,
width:370,
padding:10,
fontSize:20 ,
borderRadius:5,
  },
});