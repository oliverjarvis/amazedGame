import { StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, Platform, Text, View, ScrollView, Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from 'react-redux';
import { decreaseMusicVol, increaseMusicVol, reset } from "../redux/actions";
import {useEffect, useState, useContext, useLayoutEffect, useRef} from "react";
import { Audio } from 'expo-av';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, concat, withRepeat, withSequence } from "react-native-reanimated";
import { changeMusicVolAsync, SoundManagerContext, playButtonClick } from '../soundmanager';

let tutorial1 = require("../assets/images/Tutorial2.png");
let tutorial2 = require("../assets/images/tutorial1.png");
let tutorial3 = require("../assets/images/tutorial3.png");
let tutorial4 = require("../assets/images/tutorial4.png");

const { width } = Dimensions.get('window');


import {
  AdMobRewarded,
} from 'expo-ads-admob';

import sounds from "../assets/audio/sounds";

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


export default function HowToPlay({ navigation }) {  

  const dispatch = useDispatch();
  let soundContext = useContext(SoundManagerContext);

  const clearAsyncStorage = async() => {
    dispatch(reset());
  }


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

  const scrollViewRef = useRef<ScrollView>();

  useEffect(()=> {
		setTimeout(() => {scrollViewRef.current.scrollTo({x: -30}) }, 1) // scroll view position fix
	}, []);

  const Slide = ({number, text, image, aspectRatio, width}) =>{
    return (
      <View style={styles.view}>
        <View style={{height: "30%", width: "100%"}}>
          <Text style={{fontSize: 20,  textAlign:'left', fontWeight: 'bold'}}>{number}</Text>
          <Text style={{fontWeight: 'bold', marginTop: 10}}>{text}</Text>
        </View>
        <View style={{height: "70%", width: "100%", justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: width, height:undefined, flexShrink: 1, aspectRatio: aspectRatio}}>
            <Image source={image} style={{width: "100%", height:undefined, aspectRatio: aspectRatio}}/>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
    <View style={styles.container}>
      <View style={{height: "30%", width: "80%", backgroundColor: 'transparent'}}>
          <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold', textAlign: 'justify'}}>Amaze is the quizzical word game, where the goal is to get from the start to the end of the map, one tile at a time.</Text>
      </View>
      {/*<View style={styles.buttonbg}>
        <Text style={{color: 'white', fontWeight: 'bold'}}>For this you get two clues: the definition of a word, and the knowledge that the word is one letter away from the previous word.</Text>
      </View>
  <Text style={{color: 'white', fontWeight: 'bold'}}>Gibberish Games ©</Text>*/}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.container2}
        pagingEnabled={true}
        horizontal= {true}
        decelerationRate={0}
        snapToInterval={width - 60}
        snapToAlignment={"center"}
        contentInset={{
          top: 0,
          left: 30,
          bottom: 0,
          right: 30,
        }}>
        <Slide number="①" width={"80%"} text="Get from the start to the goal on the map. All words are one letter away from the previous word." image={tutorial1} aspectRatio={298/150}/>
        <Slide number="②" width={"80%"} text="Use the word definitions to guide you along." image={tutorial2} aspectRatio={750/274}/>
        <Slide number="③" width={"80%"} text="Type your guess." image={tutorial3} aspectRatio={753/346}/>
        <Slide number="④" width={"40%"} text="Use a Skip powerup, if you get stuck.." image={tutorial4} aspectRatio={1}/>
      </ScrollView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingTop: "10%",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#26303F',
  },
  container2:{
    backgroundColor:'transparent',
    height: "100%"
  },
  view: {
    backgroundColor: 'white',
    elevation: 5,
    width: width - 80,
    padding: "1%",
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    height: "80%",
    borderRadius: 10,
  },
  view2: {
    marginTop: 100,
    backgroundColor: 'red',
    width: width - 80,
    margin: 10,
    height: "70%",
    borderRadius: 10,
    paddingHorizontal : 30
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
    width: '80%', 
    alignItems: 'center',
    backgroundColor: 'transparent'
},
  logoContainer:{
    width:"90%", 
    aspectRatio: 401/125,
    alignItems:'center', 
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
