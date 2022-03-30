import { StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View } from '../components/Themed';
import { useDispatch } from 'react-redux';
import { reset } from "../redux/actions";

import {
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';


let logo = require('../assets/logo.png');

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

async function showInterstitialRewardedAd(){
  await AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/5224354917'); // Test ID, Replace with your-admob-unit-id
  try{
    await AdMobRewarded.requestAdAsync();
  }catch(e){
    console.log(e);
  }
  console.log("adsfasdf");
  await AdMobRewarded.showAdAsync();
}

const MiniModal = () => {
  return (
    <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: "rgba(0,0,0,0.2)", justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: '#fff', width: "80%", aspectRatio: 3/2, elevation: 5, borderRadius: 20, flexDirection: 'column', justifyContent: 'flex-end'}}>
          <View style={{flexGrow: 1, backgroundColor: 'transparent', padding: "5%", justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: "#444", fontSize: 20}}>Oh no!</Text>
            <Text style={{color: "#444", fontSize: 20}}>No more skips left!</Text>
          </View>
          <TouchableOpacity onPress={() => showInterstitialRewardedAd()} style={{ width: "100%", height: "30%", alignItems: 'center', backgroundColor: 'transparent', borderTopColor: "#999", borderTopWidth: 1, justifyContent: 'center'}}>
            <Text style={{ color: '#444', fontSize: 20}}>Earn two skips</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}



export default function TabOneScreen({ navigation }) {
  const dispatch = useDispatch();

  const clearAsyncStorage = async() => {
    dispatch(reset());
  }
 
  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", (reward) => {
    console.log(reward);
  });

  return (
    <>
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo}/>
      </View>
      <View style={styles.buttonbg}>
        
        <Button text="Select a Level"  onPress={() => navigation.navigate('LevelSelector')} />
        <Button text="Credits" onPress={() => navigation.navigate('Credits')} />    
        <Button text="clear storage" onPress={() => clearAsyncStorage()} />  
      </View>
    </View>
    </>
  );
}

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
