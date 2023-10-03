//import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {View,Text,Button} from 'react-native';
import UpdateBlog from './UpdateBlog'
import Signin from './Signin';
import {useNavigation} from '@react-navigation/native'


export default function UpdateDeleteBlog(){
  const navigation=useNavigation();
  const updateBlog=()=>{
    navigation.navigate('Update');
  }
  return(<View>
    <Button title="Delete"></Button>
    <Button title="Update" onPress={updateBlog}></Button>
  </View>
 
  )
}