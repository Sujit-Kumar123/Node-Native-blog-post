import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Pagination({changed,currentPage,blogCount}) {
  const onePageIncrement=()=>{
    if(parseInt(blogCount/6)>currentPage){
          changed(currentPage+1);
    }
  }
  const twoPageIncrement=()=>{
    if(parseInt(blogCount/6)-1>currentPage){
          changed(currentPage+2);
    }
  }
  const onePageDecrement=()=>{
    if(currentPage>1){
      changed(currentPage-1)
    } 
  }
  const twoPageDecrement=()=>{
     if(currentPage>2){
      changed(currentPage-2)
    }
  }
  return (
    <View style={styles.pagination}>
      <TouchableOpacity style={styles.paginationTouch} onPress={twoPageDecrement}>
          <Text style={styles.pagenationText}>{'<<'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paginationTouch} onPress={onePageDecrement}>
        <Text style={styles.pagenationText}>{'<'}</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.paginationTouch}>
        <Text style={styles.pagenationText}>{currentPage}</Text>
      </TouchableOpacity>
       <TouchableOpacity style={styles.paginationTouch}>
        <Text style={styles.pagenationText}>{currentPage+1}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paginationTouch} onPress={onePageIncrement}>
        <Text style={styles.pagenationText}>{'>'}</Text>
      </TouchableOpacity>
       <TouchableOpacity  style={styles.paginationTouch} onPress={twoPageIncrement}>
        <Text style={styles.pagenationText}>{'>>'}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  pagination: {
    flex:1 ,
    margin: 10,
    marginBottom: 20,
    flexDirection:'row',
    marginHorizontal:55,
  },
  paginationTouch:{
    flex:1,
    backgroundColor:'#E8E8E8',
    textAlign:'center',
    margin:1,
    paddingHorizontal:9 ,
  },
  pagenationText:{
    fontSize:24,
    color:'blue',
  },
});
