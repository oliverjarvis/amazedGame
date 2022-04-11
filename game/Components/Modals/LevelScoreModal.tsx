import React, { useEffect, useState } from 'react';
import { Alert, View, Text, Pressable, Modal, StyleSheet, FlatList, Platform } from 'react-native';
import { useContext } from 'react';
import { TileState } from '../../GameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { gameManagerContext } from '../../GameLogic';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';
import { setLevelProgress } from '../../../redux/actions';
import { CompletionType } from '../../../redux/interfaces';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { CommonActions } from '@react-navigation/native';

enum CompletionState {
  unlocked = "u",
  locked = "l",
  completed = "c",
  perfected = "p"
}



async function showAdsAndNavigate(navigationEvent){
  await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1712485313'); // Test ID, Replace with your-admob-unit-id
  try{
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  }catch(e){
    console.log(e);
  }
  await AdMobInterstitial.showAdAsync();
  navigationEvent();
}

const FailButtons = ({navigation, levelid, setVisible}:{navigation:any, levelid:number, setVisible:any}) => {
  const { state } = useContext(gameManagerContext);

  async function showAdsAndNavigate(e){
    const AdUnitId = Platform.select({
      ios: "ca-app-pub-3899429663512482/2505264283",
      android: "ca-app-pub-3899429663512482/5260006869"
    });
    await AdMobInterstitial.setAdUnitID(AdUnitId); // Test ID, Replace with your-admob-unit-id
    try{
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
    }catch(e){
      console.log(e);
    }
    await AdMobInterstitial.showAdAsync();
    navigation.dispatch(e.data.action);
  }
  
  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        if(state.gameOver){
          console.log("Not showing!")
          showAdsAndNavigate(e);
        }else{
          console.log("GO HERE");
          navigation.dispatch(e.data.action);
        }
      }),
    [navigation]
  );

  return (
    <View style={{flexDirection:"row", height: "15%", width:"80%", alignItems:'center', justifyContent: 'center'}}>
      <Pressable style={styles.buttonNext} onPress={() => { setVisible(false); }}>
        <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center', color:'white'}}>Retry</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => { navigation.navigate("LevelSelector");/*showAdsAndNavigate(() => navigation.navigate("LevelSelector")); }*/}}>
        <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center', color:"#fff"}}>Next</Text>
      </Pressable>
    </View>
  )
}


const LevelStars = ({levels_completed}: {levels_completed: TileState[]}) => {
  return(
  <View style={{height: "60%", justifyContent: 'center', alignItems:'center'}}>
  <View style={{flexDirection:"row", flexWrap: 'wrap', height: "100%", width: "80%", flexGrow: 0, flexShrink: 0}}>
    {levels_completed.map((item, i) => {
      return (
        <React.Fragment key={i}>
        {item.tileMode=="completed"  && item.tileIndex != 0 && 
        <View style={{width:'23%', flexShrink: 1, margin:"0.4%", backgroundColor: "#293D46", paddingVertical: "4%", borderRadius: 5, flexDirection:'column'}} key={i}>
          <Text style={{textAlign:'center', fontSize: 14, fontWeight:'bold', color:'white'}}>💎 {item.tileMode == 'completed'? item.word : ""}</Text>
        </View>}
        </React.Fragment>
      );
    })}
  </View></View>);
}

export default function LevelScore({navigation, gameOver, hasWon, completedWords}:{navigation: any, hasWon: boolean, gameOver: boolean, completedWords: TileState[]}) {
  const word_data = completedWords.map((word, index) => { return {title: word, id:index + ""} });
  const { state, dispatch } = useContext(gameManagerContext);
  const [visible, setVisible] = React.useState(true);
  const [gameResult, setGameresult] = useState<CompletionType>(CompletionType.unlocked);
  const levelmanagerdispatch = useDispatch();


  let [pointerEventType, setPointerEventType] = useState<"auto" | "none" | "box-none" | "box-only">("box-none");
    useEffect(()=> {
      if(state.showScoreModal){
        setPointerEventType("auto");
      }else{
        setPointerEventType("box-none");
      }

    }, [state.showScoreModal])

  useEffect(() => {
    if(!visible){
      navigation.replace("GameScreen", {levelID: state.level, levelDifficulty: state.levelDifficulty});
    }
    setVisible(true);
  }, [visible])

  useEffect(() => {
    if(gameOver){
      let completed_words = completedWords.filter(item => item.tileMode == "completed").length;

      let result: any;

      if(completed_words == completedWords.length){
        result = CompletionType.perfected;
      }else if(hasWon){
        result = CompletionType.completed;
      }
      if(hasWon){
        levelmanagerdispatch(setLevelProgress(result));
      }

      setGameresult(result);

    }
  }, [gameOver])


  //
  const slideAmount = useSharedValue(1000);
  const slideStyle = useAnimatedStyle(()=>{
    return{
      transform: [{translateX: slideAmount.value}]
    };
  }, [])

  useEffect(()=>{
    if(state.showScoreModal){
      slideAmount.value = withTiming(0, {duration: 1000});
    }
  }, [state.showScoreModal])
  return (
    <View
      pointerEvents={pointerEventType}
      style={{
        position: 'absolute',
        width: "100%",
        zIndex: 99999,
        height: "100%"
      }}
    >   
         <Animated.View style={[styles.modalView, slideStyle]}>
          <LinearGradient
          // Background Linear Gradient
          start ={{x: 0, y: 0}}
          end = {{x:0, y:1}}
          colors={['#26303F', '#26303F', '#26303F', '#26303F', '#26303F']}
          style={{...styles.background}}>
                {gameOver && <><View style={{flexDirection:"column", width:"100%", marginTop: "5%", height: "20%", alignItems:'center', position: 'absolute', top: 0}}>
                  {
                    hasWon 
                      ? 
                    <LottieView style={{flex: 1}} source={require('../../../assets/lottiefiles/74694-confetti.json')} autoPlay loop/> 
                      : 
                    <LottieView style={{flex: 1}} source={require('../../../assets/lottiefiles/56450-game-over.json')} autoPlay loop={false}/>
                  }
                </View>
                <View style={{flexDirection:"column", height:"65%", marginBottom: "10%", width: "100%", alignItems:'center', justifyContent: 'space-between'}}>
                  <View style={{height: "20%", alignItems:'center', justifyContent: 'flex-start'}}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>LEVEL {state.level + 1}</Text>
                    {gameResult && gameResult == CompletionType.perfected && <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>Perfect Score!</Text>}
                    {gameResult && gameResult == CompletionType.completed && <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>Level Cleared!</Text>}
                    {gameResult && gameResult == CompletionType.unlocked && <Text style={{fontSize: 30, fontWeight: 'bold', color: 'white'}}>Too bad! Try again?</Text>}
                  </View>
                  <LevelStars levels_completed={completedWords.filter(item => item.tileMode == "completed")}/>
                  <FailButtons navigation={navigation} setVisible={setVisible} levelid={state.level}/>
                </View></>}
        </LinearGradient>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  background:{
    left: 0,
    height: "100%",
    justifyContent:'flex-end',
    right: 0,

  },
  container: {
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  itemtext:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  ScoreDisplayer:{
    backgroundColor: 'white', 
    borderRadius: 9999, 
    borderWidth: 0, 
    shadowColor: "#000",
    aspectRatio: 1,
    padding: "2%",
    margin: "3%",
    elevation: 5,
    alignSelf: 'center',
    justifyContent: 
    'center', 
    alignItems: 'center'
  },
  modalView: {
    margin: 0,
    transform: [{translateX: 1000}],
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3
  },
  button: {
    borderRadius: 15,
    textAlign: 'center',
    padding: 16,
    height: "100%",
    width: "48%",
    margin: "1%",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: "#E1566B",
    borderWidth: 2
  },
  buttonNext:{
    backgroundColor: '#E1566B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    textAlign: 'center',
    padding: 16,
    height: "100%",
    width: "48%",
    margin: "1%",
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: "center"
  },
  item: {
    padding: 10,
    width: "100%",
    borderWidth:2,
    borderColor: '#444',
    borderRadius:6
  },
});


/*

const LevelStars = ({levels_completed}: {levels_completed: TileState[]}) => {
  return(<View style={{flexDirection:"row", flexWrap: 'wrap', width: "80%", flexGrow: 0, flexShrink: 0, alignItems:'center', margin: '2%', backgroundColor:'white'}}>
    {levels_completed.map((item, i) => {
      return (
        <>
        {item.tileMode=="completed"  && item.tileIndex != 0 && 
        <View style={{width:'23%', flexShrink: 1, margin:"0.4%", backgroundColor: "#293D46", paddingVertical: "4%", borderRadius: 5, flexDirection:'column'}} key={i}>
          <Text style={{textAlign:'center', fontSize: 14, fontWeight:'bold', color:'white'}}>💎 {item.tileMode == 'completed'? item.word : ""}</Text>
        </View>}
        </>
      );
    })}
  </View>);
}
*/

/*const ScoreDisplayer = ({diamondCount}) => {
  return (
    <View style={{marginVertical: "5%"}}>
      <View style={styles.ScoreDisplayer}>
        <Text style={{fontSize: 50}}>💎</Text>
      </View>
      <Text style={styles.modalText}>{diamondCount}</Text>
      <Text style={styles.modalText}>Diamonds earned</Text>
    </View>
  ) 
}*/