import {createStackNavigator} from '@react-navigation/stack';
import UpdateBlog from './UpdateBlog'
import Details from './Details';
import UserProfile from './UserProfile'



const Stack=createStackNavigator()
export default function DetailNavigation(){
  return(
    <Stack.Navigator>
    <Stack.Screen name="Details" componets={UserProfile}/>
    <Stack.Screen name="Update" componets={UpdateBlog} options={{headerShown:false}}/>
   </Stack.Navigator>
   
  )
}