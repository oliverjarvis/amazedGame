import React, { memo, useContext, useEffect, useState } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback} from 'react-native';
import {gameManagerContext, initialState, TileState} from '../../GameLogic';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, AnimationCallback, withRepeat, withSpring, Keyframe, withDelay, Easing, runOnJS, withSequence, runOnUI } from "react-native-reanimated";
import styles from "./Tile.style";
let Goal = require('../../../assets/images/goal.png');
let goldTile = require('../../../assets/images/goldtile.png');
let greenTile = require('../../../assets/images/greentile.png');
let selectedTile = require('../../../assets/images/selectedTile.png');

function Tile({tile}: {tile: TileState}) {

  const {state, dispatch} = useContext(gameManagerContext);
  const [selectTile, setSelectTile] = useState(false);

  // react reanimated
  const progress = useSharedValue(1);
  const tileFlip = useSharedValue(0);
  const greenTileOpacity = useSharedValue(1)
  const goldTileOpacity = useSharedValue(0);

  const [notAnimating, setNotAnimating] = useState(false);


  const flipTileStyle = useAnimatedStyle(() => {
      return {
        transform: [{rotateY: `${tileFlip.value}deg`}],
      };
    }, []);
  
  const goldTileStyle = useAnimatedStyle(() => {
    return {
      opacity: goldTileOpacity.value
    };
  }, []);

  const greenTileStyle = useAnimatedStyle(() => {
    return {
      opacity: greenTileOpacity.value
    };
  }, []);

  const animatedSelectedStyle = useAnimatedStyle(() => {
    return { transform: [{scaleX: progress.value}, {scaleY: progress.value}] }
  },[]);
  
    
  useEffect(() => {
    
    if(state.tiles[tile.tileIndex].tileMode == "completed"){
      tileFlip.value = withSequence(withTiming(-180, {duration: 0}), withTiming(-360, {duration: 300}, (isFinished)=>{
        if(tile.tileIndex == 15){
          runOnJS(dispatch)({type: 'show-win'});
        }
      }));
      greenTileOpacity.value = withDelay(150, withTiming(0, {duration: 0}));
      goldTileOpacity.value = withDelay(150, withTiming(1, {duration: 0}));

    }
  }, [state.tiles[tile.tileIndex].tileMode])

  useEffect(()=> {
      if(selectTile){
        progress.value = withRepeat(withTiming(0.8, {duration: 50}), 2, true);
        setSelectTile(false);
      }
    
  }, [selectTile])

  let tileOutsetStyle = styles.outset;
  let tileHidden = {}
  if (tile.tileMode == "blank"){
    tileHidden = {opacity: 0};
  }

  let outerStyle: Array<Object> = [styles.outer];
  if(tile.tileIndex != 0){
    outerStyle.push(animatedSelectedStyle);
  }

  const [fallRest, setFallRest] = useState(false);

  function showModal(){
      setTimeout(()=>{
        dispatch({type: "show-score-modal"});
      }, 1000)
  }

  //tile win bounce
  const bounceAmount = useSharedValue(0);
  const tileWinBounceStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY:  bounceAmount.value}]
    };
  }, []);
  useEffect(() => {
    if(state.gameOver && state.hasWon && tile.tileMode == "completed"){
      bounceAmount.value = withDelay(1000 + 25 * tile.tileIndex, withRepeat(withTiming(-10, {duration: 200}), 2, true, (isFinished) => {
        runOnJS(showModal)();
      }));
    }
  }, [state.showWin])

  //tile lose fall
  const fallAmount = useSharedValue(0);
  const fallAmountStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY:  fallAmount.value}]
    };
  }, []);

  useEffect(() => {
    if(state.gameOver && !state.hasWon){
      fallAmount.value = withDelay(1000 + 25 * tile.tileIndex, withTiming(1000, {duration: 600}, (isFinished) => {
        runOnJS(showModal)();
      }));
    }
  }, [state.gameOver])

  return (
      <Animated.View style={tile.tileIndex == 0 ?[outerStyle, tileWinBounceStyle, fallAmountStyle] : [outerStyle, flipTileStyle, tileWinBounceStyle, fallAmountStyle]}>
        <TouchableWithoutFeedback
          disabled={tile.tileMode == 'completed' || tile.tileMode == 'blank' || tile.selected}
          onPress={
            () => { 
              if(!state.gameOver) 
              {
                dispatch({type: 'select-tile', payload: tile.tileIndex});
                 setSelectTile(true);
              }
            }
          }
          >
          <View>
            <Animated.View style={tile.tileIndex == 0 ? [tileOutsetStyle, goldTileStyle] : [tileOutsetStyle, {transform:[{rotateY: '0deg'}]}, goldTileStyle]}>
                <Image source={goldTile} style={styles.tileImage} />
              <View style={{position: 'absolute', zIndex: 99, height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center'}}>
                  <Text style={styles.buttonText}>{tile.word.toLowerCase()}</Text>
              </View>
            </Animated.View>
            <Animated.View style={[{...tileOutsetStyle, position: 'absolute'}, greenTileStyle]}>
              {tile.tileIndex != state.selectedTileIndex && <Image source={greenTile} style={[styles.tileImage, tileHidden]} />}
              {tile.tileIndex == state.selectedTileIndex && <Image source={selectedTile} style={[styles.tileImage, tileHidden]} />}
              { tile.tileMode != "completed" && tile.tileIndex == 15? <View style={{position: 'absolute', zIndex: 99, height: "80%", width: "80%", justifyContent: 'center', alignItems: 'center'}}><Image source={Goal} style={styles.endGoal} /></View>: null }
            </Animated.View>
         </View>
        </TouchableWithoutFeedback>
    </Animated.View>
    );
}

export default memo(Tile);