import { Text, View, StyleSheet } from 'react-native';





export default function Footer(){
  return(
    <View style={style.navbar}>
    <Text>Footer</Text>
    </View>
  )
}
const style=StyleSheet.create({
  navbar:{
    flex:3,
    marginTop:5,
    width:375,
    alignItems:'center',
  }
})