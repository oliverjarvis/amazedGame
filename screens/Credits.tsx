import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
let logo = require('../assets/logo.png');

//import logo from '../assets/logo.png';

const Button = ({text, onPress}) => {
  return (
    <View style={buttonstyle.button}>
      <TouchableOpacity onPress={onPress} style={buttonstyle.insetStyle}>
        <View style={buttonstyle.outsetStyle}>
          <Text style={{fontSize: 25,  fontWeight:'bold', textAlign: 'center', textAlignVertical:"center", color: '#fff'}}>{ text }</Text>
        </View>
      </TouchableOpacity>
    </View>
    );
}

export default function Credits() {
  // return section headers
  const RenderSectionHeader = ({title}:{title: string}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{title}</Text>
      </View>
    );
  }

  // return section content
  const RenderSectionContent = ({section}) => {
    return (
      <View style={styles.sectionContent}>
        <Text style={styles.sectionContentText}>{section.content}</Text>
      </View>
    );
  } 

  return (
      <View style={styles.container}>
        <RenderSectionHeader title={"Credits"} />
        <Text style={styles.sectionContentText}>Code and Design: Oliver Jarvis</Text>
        <Text style={styles.sectionContentText}>Help/motivation: Helene Gregersen</Text>
        <Text style={styles.sectionContentText}>Music: Kevin MacLeod</Text>
        <Text style={styles.sectionContentText}>Sound Effects: sdfasldkf sadfljasdl</Text>
        <Text style={styles.sectionContentText}>Sound Effects: sdfasldkf sadfljasdl</Text>
        <Text style={styles.sectionContentText}>Sound Effects: sdfasldkf sadfljasdl</Text>
        <Text style={styles.sectionContentText}>Sound Effects: sdfasldkf sadfljasdl</Text>
        <Text style={styles.sectionContentText}>Lottie Animations: dflajsdkfj sdfkljasd</Text>
        <Text style={styles.sectionContentText}>Lottie Animations: asdkfasdfs asdfasdf</Text>
        <Text style={styles.sectionContentText}>Lottie Animations: dflajsdkfj sdfkljasd</Text>

      </View>
  );
  
}

/*<EditScreenInfo path="/screens/TabOneScreen.tsx" />
*/
const styles = StyleSheet.create({
  sectionHeader: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 10,
    width: "100%",
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  sectionHeaderText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: 'bold',
    fontSize: 20,
  },
  sectionContent: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    color: '#333',
  },
  sectionContentText: {
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#333',
  },
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
    color: '#fff'
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
    borderRadius: 5,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  outsetStyle:{
    width: "100%",
    height: '92%',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#ffc000",
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
});
