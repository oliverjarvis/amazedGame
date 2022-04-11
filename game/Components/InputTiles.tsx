import {useState, useContext, useEffect, memo} from 'react';
import {View, TouchableWithoutFeedback, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, AnimationCallback, withRepeat, withSpring, Keyframe, withDelay, Easing, withSequence, runOnJS } from "react-native-reanimated";
import { playError } from '../../soundmanager';
import {gameManagerContext} from '../GameLogic';
import {keyboardContext} from './Keyboard/KeyboardLogic';
import {HintPowerup, SkipPowerup} from './PowerupBar';
import { useSelector, useDispatch } from "react-redux";

import { RootState } from '../../redux/reducers';
import { AdMobRewarded } from 'expo-ads-admob';
import { spendSkip, incrementSkip } from '../../redux/actions';

import RewardedModal from "./Modals/RewardedModal";
import { loadAd } from '../../constants/Ads';
import SettingsModal from './Modals/SettingsModal';
import ConfirmationModal from './Modals/ConfirmationModal';

let arrowRight = require('../../assets/images/arrowright.png');

const InputTiles = memo(() => {

  const {keyboardstate, keyboarddispatch} = useContext(keyboardContext);
  const {state, dispatch} = useContext(gameManagerContext);

  const levelmanager = useSelector((state: RootState) => state.levelmanager);
  const levelManagerDispatch = useDispatch();

  const [showConfirmationBox, setShowConfirmationBox] = useState(false);

  let tile_count = 4;
  const [textValue, setTextValue] = useState("");
  const [fontcolor, setFontcolor] = useState("#444");
  const [showSkipWordModal, setShowSkipWordModal] = useState(false);
  const [eventHasPaidOut, setEventHasPaidOut] = useState(false);

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
  }, [state.prevWord])

  useEffect(() => {
    setTextValue("");
  }, [state.guesses])

  function useSkip(){
      if(levelmanager.skips > 0){
        dispatch({type:'skip-word'});
        levelManagerDispatch(spendSkip());
      }else{
        setShowConfirmationBox(false);
        setShowSkipWordModal(true);
      }
    
    setShowConfirmationBox(false);
  }

  useEffect(() => {
    AdMobRewarded.removeAllListeners();
    
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
        levelManagerDispatch(incrementSkip());
        setShowSkipWordModal(false);
        dispatch({type: "pause-unpause"});
    });
  
    AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", () => {
      loadAd();
      dispatch({type: "pause-unpause"});
    });
    AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () =>{
      if(levelmanager.skips > 0){
        dispatch({type:'skip-word'});
        dispatch({type: "pause-unpause"});
      }
      setShowSkipWordModal(false);
    })
  }, [])
  
  useEffect(()=>{
  }, [state.completed_words])

  useEffect(() => {
    setFontcolor(state.selectedTileIndex == -1 ? '#fff' : "#999");
  }, [state.selectedTileIndex])

  return (
        <>
        <View style={styles.outerboard}>
        <HintPowerup powerupcount={levelmanager.hints} onPress={() => {if(state.selectedTileIndex > -1) dispatch({type:'skip-word'})}}/>
          <View style={styles.inputboard}>
            {Array(tile_count).fill(0).map((item, i) => {

              const bounce = useSharedValue(0);
              const shake = useSharedValue(0);

              let inputBounce = useAnimatedStyle(() => {
                return {
                  transform: [{translateY: -bounce.value }]
                };
              }, []);

              let inputShake = useAnimatedStyle(() => {
                return {
                  transform: [{translateX: -shake.value }]
                };
              }, []);

              useEffect(()=>{
                if(state.completedWordCount > 0){
                  shake.value = withSequence(withTiming(-5, {duration: 50}), withTiming(10, {duration: 100}), withTiming(0, {duration: 50}));
                  if(i==0){
                    playError();
                  }
                }
              }, [state.guesses]);

              const [inputBounceFinished, setInputBounceFinished] = useState(false);

              useEffect(()=>{
                if(inputBounceFinished){
                    setTimeout(()=> {
                      //dispatch({type: "clear-text"});
                      setInputBounceFinished(false);
                    }, 1000);
                }
              }, [inputBounceFinished])

              useEffect(() => {
                if(state.completedWordCount > 0){
                  bounce.value = withDelay(50 * i, withRepeat(withTiming(15, {duration: 130}), 2, true, (isFinished) => {
                    if(i==3) runOnJS(setInputBounceFinished)(true);
                  }))
                }
              }, [state.completedWordCount]);

              return (
                  <Animated.View key={i} style={[{...styles.textcard }, inputShake, inputBounce]}>
                    { (i + 1) > textValue.length && <Text key={i} style={{fontSize: 40, color:fontcolor, fontWeight:'bold', textAlignVertical: "center",textAlign: "center"}}>{state.prevWord[i]}</Text>}
                    { (i + 1) <= textValue.length && <Text key={i} style={{fontSize: 40, color:'#444', fontWeight:'bold', textAlignVertical: "center",textAlign: "center"}}>{textValue[i]}</Text>}
                  </Animated.View>
                );
            })}
          </View>
          <SkipPowerup powerupcount={levelmanager.skips} onPress={() => {console.log(state.selectedTileIndex); if(state.selectedTileIndex > -1) setShowConfirmationBox(true)}}/>
        </View>
        <RewardedModal powerup="skip" showModal={showSkipWordModal} setCloseModal={setShowSkipWordModal} />
        <ConfirmationModal confirmation="Spend skip?" show={showConfirmationBox} setshow={setShowConfirmationBox} callback={useSkip}/>
        </>
  );
});

export default InputTiles;

const styles = StyleSheet.create({
    outerboard:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height:"10%",
      marginHorizontal: "1%",
      zIndex: 1,
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
      backgroundColor: '#fff',
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