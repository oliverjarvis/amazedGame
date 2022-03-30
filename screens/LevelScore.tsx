import React, { useEffect } from 'react';
import { Alert, View, Text, Pressable, Modal, StyleSheet, FlatList } from 'react-native';
import { useContext } from 'react';
import { TileState } from '../game/GameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { gameManagerContext } from '../game/GameLogic';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useDispatch } from 'react-redux';
import { setLevelProgress } from '../redux/actions';
import { CompletionType } from '../redux/interfaces';

import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';

enum CompletionState {
  unlocked = "u",
  locked = "l",
  completed = "c",
  perfected = "p"
}

async function showAdsAndNavigate(navigationEvent){
  await AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/1033173712'); // Test ID, Replace with your-admob-unit-id
  try{
    await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true});
  }catch(e){
    console.log(e);
  }
  console.log("adsfasdf");
  await AdMobInterstitial.showAdAsync();
  navigationEvent();
}

const FailButtons = ({navigation}:{navigation:any}) => {
  return (
    <View style={{flexDirection:"column", width:"80%", alignItems:'center'}}>
      <Pressable style={styles.buttonNext} onPress={() => { navigation.push("GameScreen", {level_id: 1})}}>
        <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center', color:'white'}}>Retry</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => { showAdsAndNavigate(() => navigation.navigate("LevelSelector")); }}>
        <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center', color:"#444"}}>Next</Text>
      </Pressable>
    </View>
  )
}


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

const ScoreDisplayer = ({diamondCount}) => {
  return (
    <View style={{marginVertical: "5%"}}>
      <View style={styles.ScoreDisplayer}>
        <Text style={{fontSize: 50}}>💎</Text>
      </View>
      <Text style={styles.modalText}>{diamondCount}</Text>
      <Text style={styles.modalText}>Diamonds earned</Text>
    </View>
  ) 
}

export default function LevelScore({navigation, gameOver, hasWon, completedWords}:{navigation: any, hasWon: boolean, gameOver: boolean, completedWords: TileState[]}) {
  const word_data = completedWords.map((word, index) => { return {title: word, id:index + ""} });
  const { state } = useContext(gameManagerContext);
  const [visible, setVisible] = React.useState(false);
  const [diamondCount, setDiamondCount] = React.useState(0);

  const dispatch = useDispatch();


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
        dispatch(setLevelProgress(result));
      }

    }
  }, [gameOver])
  
  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={gameOver}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
      >
        {gameOver &&
         <View style={styles.modalView}>
          <LinearGradient
          // Background Linear Gradient
          start ={{x: 0, y: 0}}
          end = {{x:0, y:1}}
          colors={['#FED392', '#FFFBF5', '#FED392']}
          style={{...styles.background}}>
                <View style={{flexDirection:"column", width:"100%", marginTop: "10%", height: "20%", alignItems:'center', position: 'absolute', top: 0}}>
                  {hasWon ? <LottieView style={{flex: 1}} source={require('../assets/lottiefiles/74694-confetti.json')} autoPlay loop/> : <LottieView style={{flex: 1}} source={require('../assets/lottiefiles/56450-game-over.json')} autoPlay loop={false}/>}
                </View>
                <View style={{flexDirection:"column", height:"70%", marginBottom: "5%", width: "100%", alignItems:'center'}}>
                  <Text style={{fontSize: 30, fontWeight: 'bold'}}>LEVEL {state.level}</Text>
                  <ScoreDisplayer diamondCount={completedWords.length > 0 ? diamondCount : 0}/>
                  <FailButtons navigation={navigation}/>
                </View>
        </LinearGradient>
        </View>
        }
      </Modal>
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
    height: "100%",
    width: "100%",
    backgroundColor: "white",
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
    width: "100%",
    margin: "1%",
    backgroundColor: 'transparent',
    borderColor: "#E1566B",
    borderWidth: 2
  },
  buttonNext:{
    backgroundColor: '#E1566B',
    borderRadius: 15,
    textAlign: 'center',
    padding: 16,
    width: "100%",
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