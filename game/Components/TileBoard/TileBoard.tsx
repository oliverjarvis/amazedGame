import React, { useContext, useEffect, useState, memo } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Tile from '../Tile/Tile';
import {gameManagerContext} from '../../GameLogic';
import styles from "./TileBoard.style";
import { useAnimatedStyle, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';

let arrowRight = require('../../../assets/images/arrowright.png');
let arrowDown = require('../../../assets/images/arrowdown.png')
let arrowUp = require('../../../assets/images/arrowup.png');
let arrowLeft = require('../../../assets/images/arrowleft.png')


function getArrowDirectionHorizontal(state, leftTile: any, rightTile: any){
  if( state.tiles[leftTile].tileMode == 'completed' || state.tiles[rightTile].tileMode == 'completed'){
    return state.tiles[leftTile].arrowsTo.includes(rightTile) ? "right" : state.tiles[rightTile].arrowsTo.includes(leftTile) ? "left" : null;
  }
  return null;
}

function getArrowDirectionVertical(state, upTile: any, downTile: any){
  if(state.tiles[upTile].tileMode == 'completed' || state.tiles[downTile].tileMode == 'completed'){
    if(state.tiles[upTile].arrowsTo.includes(downTile)){
      return "down";
    }else if(state.tiles[downTile].arrowsTo.includes(upTile)){
      return "up";
    }
  }
  return null;
}

function calculateExtraMargin(index: number){
  if(index == 7 || index == 8 || index == 9 || index == 18 || index == 19 || index == 20 || index == 29 || index == 30 || index == 31){
    return {marginRight: "5.33%"};
  }
  return {};
}

function BoardView() {  
    const {state} = useContext(gameManagerContext);

    const [dataloaded, setDataloaded] = useState(false);

    useEffect(()=>{
      if(state.tiles.length > 0){
        setDataloaded(true);
      }
    }, [state.tiles])

    const topdownArrowCount = 12;
    const leftrightArrowCount = 12;
    const element_count = state.tiles.length + topdownArrowCount + leftrightArrowCount;
    
    let tile_coords: number[] = [0, 2, 4, 6, 11, 13, 15, 17, 22, 24, 26, 28, 33, 35, 37, 39];
    let updownArrows: number[] = [7, 8, 9, 10, 18, 19, 20, 21, 29, 30, 31, 32];

    let updowntiles: {up: number, down:number} [] = [
      {up: 0, down: 4},
      {up: 1, down: 5},
      {up: 2, down: 6},
      {up: 3, down: 7},
      {up: 4, down: 8},
      {up: 5, down: 9},
      {up: 6, down: 10},
      {up: 7, down: 11},
      {up: 8, down: 12},
      {up: 9, down: 13},
      {up: 10, down: 14},
      {up: 11, down: 15}
    ];


    //arrow animation on game end
    let [vanishArrows, setVanishArrows] = useState(false);
    useEffect(()=>{
      if(state.gameOver){
        setTimeout(()=>{
          setVanishArrows(true);
        }, 100)
      }
    }, [state.gameOver])

    return (
        <View style={styles.container}>
          {dataloaded && 
          Array(element_count).fill(0).map((_, index) => {            
            
            if(tile_coords.includes(index)){
              return (
                <React.Fragment key={index}>
                  <Tile key={index} tile={state.tiles[tile_coords.indexOf(index)]} />
                </React.Fragment>
              );
            }
            
            if(updownArrows.includes(index)){
              
              let extraMargin = calculateExtraMargin(index);
              let updownIndex = updownArrows.indexOf(index);
              let upTileIndex = updowntiles[updownIndex].up;
              let downTileIndex = updowntiles[updownIndex].down;
              let arrow: null | "up" | "down" = getArrowDirectionVertical(state, upTileIndex, downTileIndex);

              return (
                <View key={index} style={{...extraMargin, ...styles.verticalArrowContainer}}>
                  {arrow && !vanishArrows && <Image source={arrow == "down" ? arrowDown : arrowUp} style={styles.verticalArrow}/>}
                </View>
              );
            }
              
              let left_tile = tile_coords.indexOf(index - 1);
              let right_tile = tile_coords.indexOf(index + 1);
              let arrow: null | "left" | "right" =  getArrowDirectionHorizontal(state, left_tile, right_tile);

              return <Image key={index} source={arrow && (arrow == "left"? arrowLeft : arrowRight)} style={[styles.horizontalArrow, vanishArrows? {opacity: 0} : {opacity: 1}]} />; 
            
            })}
        </View>
      );
}

export default memo(BoardView);