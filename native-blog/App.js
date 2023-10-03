import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import Background from './components/Background'
import Home from './components/Home';
import Details from './components/Details'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {NavigationContainer} from '@react-navigation/native';
//import {createStackNavigator} from '@react-navigation/stack';
// or any pure javascript modules available in npm


export default function App() {
  //const Stack = createStackNavigator();
  return (
    <View style={styles.container}>
    <Navbar/>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0.41.255.0)',
  
  },
  
});
