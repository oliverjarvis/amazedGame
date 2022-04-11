import { StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Platform, Text, View } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from 'react-redux';
import { decreaseMusicVol, increaseMusicVol, reset, updateHandoutDate } from "../redux/actions";
import {useEffect, useState, useContext, useLayoutEffect} from "react";
import { Audio } from 'expo-av';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, concat, withRepeat, withSequence } from "react-native-reanimated";
import { changeMusicVolAsync, SoundManagerContext, playButtonClick } from '../soundmanager';

import {
  AdMobRewarded,
} from 'expo-ads-admob';

import sounds from "../assets/audio/sounds";
import { RootState } from '../redux/reducers';
import PrizeModal from '../game/Components/Modals/PrizeModal';

let logo = require('../assets/images/logo2.png');
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

const buttonClickSFX = new Audio.Sound();


const onPlayPress = async () => {
  await buttonClickSFX.replayAsync();
}



export default function TabOneScreen({ navigation }) {  

  const dispatch = useDispatch();
  let soundContext = useContext(SoundManagerContext);

  const clearAsyncStorage = async() => {
    dispatch(reset());
  }

  async function setupSFX(){
    await buttonClickSFX.loadAsync(
      require("../assets/audio/buttonclick.mp3")
    );
  }

  useLayoutEffect(() => {
    console.log("play");
    setupSFX();
  }, []);

  useEffect(() => {
    const startPlayback = async () => {
      await soundContext.unloadAsync();
      await soundContext.playAsync();
    }
    if(soundContext != null){
      startPlayback();
    }

  }, [soundContext]);
  

  // animation
  const angle = useSharedValue(0);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${angle.value}deg` }],
    };
  }, []);

  useEffect(()=> {
    angle.value = 
      withSequence(
        withTiming(-1, {duration: 144}),
        withRepeat(withTiming(1, {duration: 288}), -1, true)
      );
  }, [])


  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", (reward) => {
    //console.log(reward);
  });

  return (
    <>
    <View style={styles.container}>
      <Animated.View style={[styles.logoContainer, reanimatedStyle]}>
        <Image source={logo} style={styles.logo}/>
      </Animated.View>
      <View style={styles.buttonbg}>
        <Button text="Select a Level"  onPress={() => {playButtonClick(); navigation.navigate('LevelSelector')}} />
        <Button text="How to play" onPress={() => {playButtonClick(); navigation.navigate('How To Play');  }} /> 
        <Button text="Remove Ads" onPress={() => {playButtonClick();   }} /> 
        <Button text="clear storage" onPress={() => {playButtonClick(); clearAsyncStorage();  }} /> 
      </View>
      <Text style={{color: 'white', fontWeight: 'bold'}}>Gibberish Games ©</Text>
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
    aspectRatio: 401/125,
    alignItems:'center', 
    flexShrink: 1,
    backgroundColor: 'transparent',
  },
  logo: {
    width: "100%", 
    aspectRatio: 401/125,
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
