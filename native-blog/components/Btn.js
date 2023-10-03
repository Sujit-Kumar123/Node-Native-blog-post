import {View,Text,TouchableOpacity} from 'react-native';
import React from 'react';

const Btn=({textColor, bgColor,btnLabel,callEvent})=>{
return(  
  <TouchableOpacity style={{backgroundColor:bgColor,borderRadius:100,alignItems:'center',width:'75%',padding: 10,}} onPress={callEvent}>
  <Text style={{color:textColor,fontSize:22,fontWeight:'bold'}}>
  {btnLabel}
  </Text>
  </TouchableOpacity>)
};
export default Btn;