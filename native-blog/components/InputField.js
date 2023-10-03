import React from 'react';
import {TextInput} from 'react-native';

const InputField=(props)=>{
return(
  <TextInput{...props} style={{
    borderRadius:100,paddingHorizontal:10,width:'75%',height:40,backgroundColor:'rgb(220,220,220)',marginVertical:5
  }}>
  </TextInput>
)
}
export default InputField;