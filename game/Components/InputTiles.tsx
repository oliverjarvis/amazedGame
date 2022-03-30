import {useState, useContext, useEffect, memo} from 'react';
import {View, TouchableWithoutFeedback, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {gameManagerContext} from '../GameLogic';
import {keyboardContext} from './Keyboard/KeyboardLogic';
import {HintPowerup, SkipPowerup} from './PowerupBar';
import { useSelector, useDispatch } from "react-redux";

import { RootState } from '../../redux/reducers';
import { AdMobRewarded } from 'expo-ads-admob';
import { spendSkip, incrementSkip } from '../../redux/actions';

let arrowRight = require('../../assets/arrowright.png');

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

const InputTiles = () => {

  const MiniModal = memo(() => {
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
  });

  const {keyboardstate} = useContext(keyboardContext);
  const {state, dispatch} = useContext(gameManagerContext);

  const levelmanager = useSelector((state: RootState) => state.levelmanager);
  const levelManagerDispatch = useDispatch();


  let tile_count = 4;
  const [keyboardActive, setKeyboardActive] = useState(state.selectedTileIndex != -1);
  const [textValue, setTextValue] = useState("");
  const [fontcolor, setFontcolor] = useState("#444");
  const [showSkipWordModal, setShowSkipWordModal] = useState(false);

  useEffect(() => {
    let text = textValue;
    if(state.selectedTileIndex == -1){return;}
    if(keyboardstate.letter === "⌫"){
      if(text.length > 0){
        text = text.substring(0, text.length - 1);
      }
    }else{
      if(text.length < 4){
        text += keyboardstate.letter;
      }
      if(text.length == 4){
        dispatch({type: "validate-answer", payload: {guess: text, tileIndex: state.selectedTileIndex}})
      }
    }
    setTextValue(text);
  }, [keyboardstate])

  useEffect(() => {
    if(state.selectedTileIndex > -1){
        setTextValue("");
    }else if(state.selectedTileIndex == -1){
      setTextValue("");
    }
  }, [state.guesses])

  function useSkip(){
    console.log("hello");
    if(levelmanager.skips > 0){
      dispatch({type:'skip-word'});
      levelManagerDispatch(spendSkip());
    }else{
      setShowSkipWordModal(true);
    }
  }

  AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
    levelManagerDispatch(incrementSkip());
    setShowSkipWordModal(false);
  });

  AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () =>{
    console.log("x");
    if(levelmanager.skips > 0){
      console.log("a");
      dispatch({type:'skip-word'});
      console.log("b");
    }
  })

  useEffect(() => {
    setFontcolor(state.selectedTileIndex == -1 ? '#fff' : "#F2A6B1");
  }, [state.selectedTileIndex])
  return (
        <>
        <View style={styles.outerboard}>
          <SkipPowerup powerupcount={levelmanager.skips} onPress={() => useSkip()}/>
          <View style={styles.inputboard}>
            {Array(tile_count).fill(0).map((item, i) => {
              return (
                  <View key={i} style={{...styles.textcard }}>
                    { (i + 1) > textValue.length && <Text key={i} style={{fontSize: 40, color:fontcolor, fontWeight:'bold', margin:0, padding:0, textAlignVertical: "center",textAlign: "center"}}>{state.prevWord[i]}</Text>}
                    { (i + 1) <= textValue.length && <Text key={i} style={{fontSize: 40, color:'#fff', fontWeight:'bold',  margin:0, padding:0, textAlignVertical: "center",textAlign: "center"}}>{textValue[i]}</Text>}
                  </View>
                );
            })}
          </View>
          <HintPowerup powerupcount={levelmanager.hints} onPress={() => dispatch({type:'skip-word'})}/>
        </View>
        {showSkipWordModal && <MiniModal/>}
        </>
  );
}

export default InputTiles;

const styles = StyleSheet.create({
    outerboard:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexBasis:"9%",
      marginHorizontal: "1%"
    },
    inputboard:{
        padding: "1%",
        flexBasis: "70%",
        flexGrow: 1,
        flexShrink: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        
      },
    textcard:{
      fontSize: 20,
      backgroundColor: '#E1566B',
      height: "100%",
      aspectRatio: 1,
      flexGrow: 1,
      flexShrink: 1,
      margin: "1%",
      borderRadius: 5,
      display: 'flex',
      textAlign: 'center',
      justifyContent: 'center',
    },
});