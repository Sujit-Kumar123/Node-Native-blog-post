import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, Image,Button } from 'react-native';
import Background from './Background'
import InputField from './InputField';
import Btn from './Btn';
export default function ChangePassword() {
  const [oldPassword,setOldPassword]=useState();
  const [newPassword,setNewpassword]=useState();
  const [confirmNewPassword,setConfirmPassword]=useState();
  
  return (
    <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Change Password</Text>
    </View>
    <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:80,marginTop:100,paddingHorizontal:70}}>
     <Text style={{fontSize:15,fontWeight:'bold',color:'grey',marginVertical:15}}>Change the password for batter security </Text>
   <InputField placeholder="Old Password" secureTextEntry={true}/>
   <Text></Text>
    <InputField placeholder="New Password" secureTextEntry={true}/>
    <Text></Text>
    <InputField placeholder="Confirm New Password" secureTextEntry={true}/>
    <Text></Text>
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
