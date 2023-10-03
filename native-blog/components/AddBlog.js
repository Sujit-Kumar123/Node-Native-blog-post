import React,{useState,useEffect} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//import DocumentPicker from 'react-native-document-picker';
//import ImgToBase64 from 'react-native-image-base64';
import Background from './Background';
import InputField from './InputField';
import Btn from './Btn';
import {apiUrl} from './Config';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-community/async-storage';


export default function AddBlog({navigation}) {
  const [imageUri, setImageUri] = useState();
  //const [name,setName]=useState();
  const [fileName,setFilename]=useState();
  const [type,setType]=useState()
  //const [isToken,setIsToken]=useState(false);
  const [imageName,setImageName]=useState();
  const [user,setUser]=useState([]);
  const [title,setTitle]=useState();
  const [description,setDescription]=useState();
  const [titleError,setTitleError]=useState();
  const [descriptionError,setDescriptionError]=useState();
  //const [imageError,setImageError]=useState()

  const getUser=async()=>{
    const token=await AsyncStorage.getItem('my-key');
    // Alert.alert(token)
    //setIsToken(true)
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
//Image to string using expo-file-system
const imageToBase64=async(imgUrl)=>{

  try{
   let img64String=await FileSystem.readAsStringAsync(imgUrl,{encoding: FileSystem.EncodingType.Base64,});
   setImageUri(img64String);
   // Alert.alert(typeof(img))
  }catch(error){
    Alert.alert(error)
  }
}
//Image Picker
const pickImage = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 1,
    });
    if (!result.canceled) {
      imageToBase64(result.assets[0].uri)
      Alert.alert(result.assets[0].uri)
      setFilename(result.assets[0].fileName);
      setType(result.assets[0].type);
      const imag=result.assets[0].uri
      const imgArr=imag.split('/')
      setImageName(imgArr[imgArr.length-1])
      //Alert.alert(imgArr[imgArr.length-1])
    }
  };
  //Title Picker
  const checkTitle=(text)=>{
    setTitle(text)
    if(text===''){
      setTitleError("Title required.");
    }
    else{
      setTitleError("")
      
    }
  }
  const checkDescription=(text)=>{
    setDescription(text)
    if(text===''){
      setDescriptionError("Description required.")
    }
    else{
      setDescriptionError("")
    }
  }
  const validateBlogData=(title,description)=>{
    if(title===''){
      setTitleError("Title");
      return false;
    }
    else if(description===''){
      setDescriptionError("Description required");
      return false;
    }
    else{
      return true;
    }
  }
  const handleAddBlog=async()=>{  
   if(validateBlogData(title,description)){
    Alert.alert(imageUri)
    const formData={
       user_id: user.id,
       title:title,
       description:description,
       imagebase64: imageUri,
       fileName: imageName,
       type:imageName.split('.')[1],
     }
    // await axios.post(apiUrl+"api/add_data",formData,{
    //   headers:{
    //      'Accept': 'application/json',
    //     'Content-Type': 'multipart/form-data;charset=utf-8;',
    //   }
    // })
    // .then((response)=>{
    //   Alert.alert(response.data.message);
    //   navigation.navigate('Home');
    // })
    // .catch((error)=>{
    //   //console.log(error)
    //   Alert.alert("Error");
    // })
    }
    else{
      Alert.alert("Please Fill all the field.")
    }
  }
useEffect(()=>{
    getUser();
  },[])
  return (
    <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Add Blog</Text>
    </View>
    <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:60,marginTop:100,paddingHorizontal:70}}>
    <Text style={{fontSize:25,fontWeight:'bold'}}>Make a blog</Text>
     <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginVertical:15}}>Wellcome to Blog</Text>
     <InputField placeholder="Title" onChangeText={(text)=>checkTitle(text)} />
    <Text style={styles.errors}>{titleError}</Text>
    <InputField placeholder="Description" onChangeText={(text)=>checkDescription(text)}/>
    <Text style={styles.errors}>{descriptionError}</Text>
    <TouchableOpacity style={{backgroundColor:'rgb(220,220,220)',borderRadius:100,alignItems:'center',width:'50%',marginHorizontal:40,marginVertical:30}} onPress={pickImage}>
<Text style={{color:'#A9A9A9',fontSize:14,fontWeight:'bold',padding:12}}>Image</Text>
    </TouchableOpacity>
    <Btn textColor="white" bgColor="blue" btnLabel="Add Blog" callEvent={handleAddBlog}/>
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
