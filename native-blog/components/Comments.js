import {View,Text,StyleSheet} from 'react-native';



const Comments = ({comment}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{comment.name}</Text>
    <Text style={styles.commen}>{comment.message}</Text>
  </View>
);

const styles=StyleSheet.create({
   item: {
    backgroundColor: '#E8E8E8' ,
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:5 ,
  },
  title: {
    fontSize: 20,
  },
  commen:{
    fontSize: 15,
    marginHorizontal:5,
  }
})
export default Comments;