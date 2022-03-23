import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { StatusBar } from 'expo-status-bar';

let logo = require('../assets/logo.png');

//import logo from '../assets/logo.png';

const Button = ({text, onPress}) => {
  return (
    <View style={buttonstyle.button}>
      <TouchableOpacity onPress={onPress} style={buttonstyle.insetStyle}>
        <View style={buttonstyle.outsetStyle}>
          <Text style={{fontSize: 25,  fontWeight:'bold', textAlign: 'center', textAlignVertical:"center", color: '#444'}}>{ text }</Text>
        </View>
      </TouchableOpacity>
    </View>
    );
}

export default function TabOneScreen({ navigation }) {
  return (
    <>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}/>
      </View>
      <View style={styles.buttonbg}>
        
        <Button text="Select a Level"  onPress={() => navigation.navigate('LevelSelector')} />
        <Button text="Credits" onPress={() => navigation.navigate('Credits')} />
      </View>
    </View>
    </>
  );
}

/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />
*/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
  },
  title: {
    fontSize: 70,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button:{
    backgroundColor: 'blue',
    padding: 20,
    margin: 10,
    borderRadius: 5,
  },
  buttonText:{
    fontSize: 20,
    color: '#444'
  },
  buttonbg:{
    marginTop: "10%",
    flexBasis: "20%", 
    width: '100%', 
    backgroundColor: 'transparent'
},
  logoContainer:{
    width:"80%", 
    aspectRatio: 802/263,
    alignItems:'center', 
    flexShrink: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    width: "100%", 
    aspectRatio: 802/263,
    flexShrink: 1,
  },
});

let buttonstyle = StyleSheet.create({
  button:{
    width: "100%",
    flex:1,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  insetStyle:{
    width: "80%",
    alignContent: "center",
    borderRadius: 15,
    justifyContent: 'flex-start',
    backgroundColor: '#A88600',
  },
  outsetStyle:{
    width: "100%",
    height: '92%',
    borderRadius: 15,
    backgroundColor: '#ffc000',
    justifyContent: 'center',
  },
});
