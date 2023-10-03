import React,{useState} from 'react';
import {Text, View, StyleSheet,Button,TouchableOpacity,Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
//import DocumentPicker from 'react-native-document-picker';
import Background from './Background';
import InputField from './InputField';
import Btn from './Btn';
export default function UpdateBlog() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [6, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Update Blog</Text>
    </View>
    <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:60,marginTop:100,paddingHorizontal:70}}>
    <Text style={{fontSize:25,fontWeight:'bold'}}>Update the blog</Text>
     <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginVertical:15}}>Wellcome to Blog</Text>
    <InputField placeholder="Title"/>
    <InputField placeholder="Description"/>
    <TouchableOpacity style={{backgroundColor:'rgb(220,220,220)',borderRadius:100,alignItems:'center',width:'50%',marginHorizontal:40,marginVertical:30}} onPress={pickImage}>
<Text style={{color:'#A9A9A9',fontSize:14,fontWeight:'bold',padding:12}}>Image</Text>
    </TouchableOpacity>
    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    <Btn textColor="white" bgColor="blue" btnLabel="Submit"/>
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
});