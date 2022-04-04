import { StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Platform, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { decreaseMusicVol, increaseMusicVol, reset } from "../redux/actions";
import {useEffect, useState, useContext} from "react";
import { Audio } from 'expo-av';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, concat, withRepeat } from "react-native-reanimated";
import { changeMusicVolAsync, SoundManagerContext } from '../soundmanager';

import {
  AdMobRewarded,
} from 'expo-ads-admob';

import sounds from "../assets/audio/sounds";

let logo = require('../assets/images/logo.png');
let buttonImage = require('../assets/images/button.png')
const Button = ({text, onPress}) => {
  return (
    <View style={buttonstyle.buttoncontainer}>
        <TouchableOpacity onPress={onPress}>
        <Image source={buttonImage} style={buttonstyle.buttonimage}/>
        <View style={buttonstyle.outsetStyle}>
          <Text style={{fontSize: 25,  fontWeight:'bold', textAlign: 'center', textAlignVertical:"center", color: '#26303F'}}>{ text }</Text>
        </View>
        </TouchableOpacity>
    </View>
    );
}


export default function TabOneScreen({ navigation }) {  

  const dispatch = useDispatch();
  let soundContext = useContext(SoundManagerContext);

  const clearAsyncStorage = async() => {
    dispatch(reset());
  }

  useEffect(() => {
    const startPlayback = async () => {
      await soundContext.unloadAsync();
      await soundContext.playAsync();
    }
    console.log(soundContext);
    if(soundContext != null){
      startPlayback();
    }

  }, [soundContext]);
  

  // animation
  const progress = useSharedValue(0);
  const scale = useSharedValue(180);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ rotateZ: `${scale.value}deg` }],
    };
  }, []);

  useEffect(()=> {
    console.log(progress.value);
    progress.value = withTiming(1, {duration: 2000});
    scale.value = withRepeat(withTiming(0, {duration: 2000}), 3, true)
  }, [])


  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", (reward) => {
    console.log(reward);
  });

  return (
    <>
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, reanimatedStyle]}>
        <Image source={logo} style={styles.logo}/>
      </Animated.View>
      <View style={styles.buttonbg}>
        <Button text="Select a Level"  onPress={() => navigation.navigate('LevelSelector')} />
        <Button text="Credits" onPress={() => navigation.navigate('Credits')} />    
        <Button text="clear storage" onPress={() => {clearAsyncStorage();  }} /> 
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
    backgroundColor: '#26303F',
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
    flexBasis: "30%", 
    width: '100%', 
    alignItems: 'center',
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
    zIndex: 9999
  },
});

let buttonstyle = StyleSheet.create({
  buttoncontainer:{
    width: "80%",
    aspectRatio: 562/105,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 1,
    margin: "2%",
  },
  buttonimage:{
    width: "100%", 
    aspectRatio: 562/105,
    flexShrink: 1,
  },
  insetStyle:{
    width: "80%",
    alignContent: "center",
    borderRadius: 15,
    justifyContent: 'flex-start',
    backgroundColor: '#A88600',
  },
  outsetStyle:{
    position: 'absolute',
    width: "100%",
    height: '92%',
    borderRadius: 15,
    justifyContent: 'center',
  },
});
