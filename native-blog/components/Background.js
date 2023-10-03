import React from 'react';
import {View,ImageBackground} from 'react-native';

const Background=({children})=>{
  return(
    <View>
    <ImageBackground source={require("../assets/backGround.png")} style={  {height:"100%",backgroundColor:"rgba(0, 41, 255, 0.7)"}}/>
    <View style={{position:"absolute"}}>{children}</View>
    </View>
  )
};
export default Background;