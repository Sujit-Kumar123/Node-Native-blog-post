import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native';
import {apiUrl} from './Config'


const Blogs=({blog,navigation})=>{
  return(
<View style={styles.blog}>
<TouchableOpacity onPress={()=>navigation.navigate('Details',{blog:blog})}>
<View>
<Image style={styles.blogImage}
       source={{uri: apiUrl+blog.image}}
       />
</View>
<View style={{alignItems:'center'}}>
<Text style={{color:'blue',fontSize:24,}} >
{blog.title}
</Text>
<Text style={{height:55 ,overflow:'hidden'}} >
{blog.description}
 Blog Post App Is a best to share post sdsdnjsdj sdjhnk fcdjk dsjh 
Blog Post App Is a best to share post sdsdnjsdj sdjhnk fcdjk dsjh 
</Text>
</View>
</TouchableOpacity>
</View>
  )
}
export default Blogs;
const styles=StyleSheet.create({
  blog:{
   margin:10,
   height:300,
   width:373, 
   backgroundColor: '#E8E8E8',
   padding:10,
   borderRadius:5,
  },
  blogImage:{
height:180,
width:330 ,
marginHorizontal:11,
marginTop:5,
borderRadius:4,
  }
})