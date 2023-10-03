import React,{useState,useEffect,useReducer} from 'react';
import Background from './Background';
import axios from 'react-native-axios';
import Comments from './Comments';
import {apiUrl} from './Config'
import Btn from './Btn';
import AsyncStorage from '@react-native-community/async-storage';
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
  Alert,
  Button,
} from 'react-native';

const Details = ({navigation,route}) => {
  const [isToken,setIsToken]=useState(false)
  const [comments,setComments]=useState([])
  const {blog}=route.params;
  const [user,setUser]=useState([]);
  const [comm,setComment]=useState();
  const [update,forceUpdate]=useReducer(x=>x+1,0);
  const getUser=async()=>{
    const token=await AsyncStorage.getItem('my-key');
     //Alert.alert(token)
    //setIsToken(true)
    if(token!==null){
      setIsToken(true)
     const headers={
         'Authorization': token,
         'Content-Type':'application/json',
      }
    //Alert.alert(apiUrl)
    axios.get(`${apiUrl}api/get_user`,{headers})
    .then((response)=>{
      setUser(response.data)
     //Alert.alert("OK")
    })
    .catch((error)=>{
      Alert.alert(error)
    })
    }
   
  }
  const handleComment=async(blog_id)=>{
    await axios.get(`${apiUrl}api/get_comment/${blog_id}`)
     .then(response=>{
      setComments(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
  }
 useEffect(()=>{
    getUser()
    handleComment(blog.id)
  },[blog.id,update])  
  const addComment=(text)=>{
     setComment(text)
  }
  const handleAddComment=()=>{
    //Alert.alert()
    if(isToken){
    const jsonData={
    user_id: user.id,
    name: user.username,
    message: comm,
    }
     //Alert.alert("OK")
     axios.post(`${apiUrl}api/add_comment/${blog.id}`,jsonData)
     .then(response=>{
      Alert.alert(response.data.message)
      forceUpdate()
      setComment('')
      navigation.navigate('Details',{blog:blog}); 
    })
    .catch(error=>{
      //console.log(error)
      Alert.alert("Comment is not added.")
    })
    }
   
  }
  const deleteBlog=async(id)=>{
    if(isToken){
       await axios.delete(`${apiUrl}api/delete/${id}`)
      .then((response)=>{
        Alert.alert(response.data.message)
        navigation.navigate('Home')
      })
      .catch((error)=>{
        //console.log(error)
        Alert.alert("Delete operation deny!")
      })
    }else{
      Alert.alert("You aer Not a Authorized Persion.")
    }
  }
  const deleteAllComment=async(blog_id)=>{
   if(isToken && blog.user_id=== user.id){
    await axios.delete(`${apiUrl}api/delete_All_Comment_by_owner/${blog_id}`).then((response)=>{
      Alert.alert(response.data.message);
      navigation.navigate('Home');
    }).catch((error)=>{
      Alert.alert("Deletion Deny !");
      console.log(error);
    })
    }
    else{
      Alert.alert("You aer Not a Authorized Persion.")
    }
  }
  const deleteComponet=()=>{
return(<View>
  {isToken && blog.user_id === user.id?<View style={{marginHorizontal:20,marginBottom:10,}}>
    <Button title="Delete all comment" onPress={()=>deleteAllComment(blog.id)}/></View>:null}
</View>)
  }
  return (
    <View style={styles.container}>
    <SafeAreaView  >
   <ImageBackground source={require("../assets/backGround.png")} style={  {height:"100%",backgroundColor:"rgba(0, 41, 255, 0.7)"}}>
    <Text style={styles.paragraph}>{blog.title} {blog.user_id} {user.id}</Text>
    <View style={styles.detail}>
    <Image style={styles.blogImage}
       source={{uri:apiUrl+blog.image}}
       />
    </View>
    <Text style={styles.description}>{blog.description} hjgfdjhsdjhf  Dnkjhndjf jshdjif k jh ujsdfjhnkdf df juh</Text>
  {isToken && blog.user_id === user.id ?<View style={styles.fixToText}>
        <Button
          title="Delete"
          onPress={()=>deleteBlog(blog.id)}
        />
        <Button
          title="Update"
          onPress={() => navigation.navigate('UpdateBlog')}
        />
      </View>:null}  
    <Text style={styles.comment_head}>Comments</Text>
  {isToken ?<View> <TextInput style={styles.comment_input} placeholder="Add comments..." onChangeText={(text)=>addComment(text)}/>
    <View style={{marginHorizontal:20 }}>
    <Button title="Add Comment" color="#f194ff" onPress={handleAddComment}/>
    </View></View>:null}
      <FlatList
        data={comments}
        renderItem={({item}) => <Comments comment={item} />}
        keyExtractor={item => item.id}
        ListFooterComponent={deleteComponet}
      />
      <View>
      </View>
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
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical:10,
    color:'white',
    marginTop:40,
  },
  blogImage:{
    height:180,
    width:340 ,
    marginHorizontal:3 ,
    borderRadius:4,
  },
   description: {
    margin: 24,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical:10,
    color:'white',
    marginTop:20,
  },
  detail:{
     margin:10,
   height: 200,
   width:371.5, 
   backgroundColor: '#E8E8E8',
   padding:10,
   borderRadius:5,
  },
  comment_head:{
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical:10,
    color:'white',
    marginTop:20,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:100 ,
  },
  comment_input:{
    backgroundColor: '#E8E8E8' ,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:5 ,
  }
});

export default Details;