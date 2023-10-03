import { Text, View, StyleSheet, Image,Button } from 'react-native';
import Background from './Background'
import InputField from './InputField';
import Btn from './Btn'
export default function UpdateProfilePicture() {
  return (
   <Background>
    <View style={styles.container}>
      <Text style={styles.paragraph}>Profile Picture</Text>
    </View>
     <View style={{backgroundColor:'white',height:730,width:460,borderTopLeftRadius:100,paddingTop:80,marginTop:100,paddingHorizontal:70}}>
    <Text style={{fontSize:25,fontWeight:'bold',marginRight:30,}}>Update Profile Picture</Text>
     <Btn textColor="white" bgColor='blue' btnLabel="Save"/>
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
    marginTop:60,
  },
});