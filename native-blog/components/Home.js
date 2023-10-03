import React,{useEffect,useState} from 'react';
import axios from 'react-native-axios';
import {SafeAreaView,View,FlatList,StyleSheet,Text,StatusBar,TextInput,ImageBackground} from 'react-native';
import Background from './Background';
import {apiUrl} from './Config'
import Blogs from './Blogs';
import Pagination from './Pagination';

export default function Home({navigation}) {
const [blogs,setBlogs]=useState([]);
const [currentPage,setCurrentPage]=useState(1);
const [blogcount,setBlogCount]=useState(0);

const getApiData=async()=>{
  await axios.get(`${apiUrl}api/blog_pagination?page=${currentPage}&perPage=6`).then(response=>{
setBlogs(response.data.result);
setBlogCount(parseInt(response.data.count[0].count));
  }).catch(error=>{
    console.log(error)
  })  
}
useEffect(()=>{
  getApiData()
},[currentPage])
const handleSearch=async(text)=>{
   await axios.get(`${apiUrl}api/search?q=${text}`).then(response=>{
setBlogs(response.data);
  }).catch(error=>{
    console.log(error)
  }) 
}
const handleChangedPageNumber=(currentP)=>{
  setCurrentPage(currentP);
}
  
  return (
    <View style={styles.container}>
    <SafeAreaView>
     <ImageBackground source={require("../assets/backGround.png")} style={  {height:"100%",backgroundColor:"rgba(0, 41, 255, 0.7)"}}>
     <View>
    <TextInput placeholder="search" inputMode='search' style={styles.search} onChangeText={(text)=>handleSearch(text)}/>  
    </View>
  
    <View style={{backgroundColor:'white',marginBottom:80 }}>
    {blogs.length ? 
              <FlatList
                  data={blogs}
                  renderItem={({item}) => <Blogs blog={item} navigation={navigation} />}
                  keyExtractor={(item,index) => index.toString()}
                  ListFooterComponent={<Pagination changed={handleChangedPageNumber} currentPage={currentPage} blogCount={blogcount}/> }
        />
            :<Text>Record not found </Text>}
          
    </View>
   </ImageBackground>
    </SafeAreaView>
      </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"rgba(0, 41, 255, 0.7)",
   
  },
  search:{
    backgroundColor:'white',
    width:280,
    paddingHorizontal:20,
    borderRadius:5,
    marginHorizontal:55,
    marginTop:40,
    marginBottom:10,
    height:35 , 
    fontSize:18 ,
  }
});
