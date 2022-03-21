import React, { useContext } from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Tile from './Tile';
import {gameManagerContext} from '../GameLogic';

let arrowRight = require('../../assets/arrowright.png');
let arrowDown = require('../../assets/arrowdown.png')
let arrowUp = require('../../assets/arrowup.png');
let arrowLeft = require('../../assets/arrowleft.png')

function BoardView() {  
    const {state, dispatch} = useContext(gameManagerContext);
    const topdownArrowCount = 12;
    const leftrightArrowCount = 12;
    const element_count = state.tiles.length + topdownArrowCount + leftrightArrowCount;
    
    let tile_coords: number[] = [0, 2, 4, 6, 11, 13, 15, 17, 22, 24, 26, 28, 33, 35, 37, 39];
    let updownArrows: number[] = [7, 8, 9, 10, 18, 19, 20, 21, 29, 30, 31, 32];
    let leftrightArrows: number[] = [1, 3, 5, 12, 14, 16, 23, 25, 27, 34, 36, 38];

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

    return (
        <View style={styles.container}>
          {Array(element_count).fill(0).map((_, index) => {
            if(tile_coords.includes(index)){
              return (
                <React.Fragment key={index}>
                  <Tile key={index} tile={state.tiles[tile_coords.indexOf(index)]} />
                </React.Fragment>
              );
            }else if(updownArrows.includes(index)){
              
              let extraMargin = {};
              let updownIndex = updownArrows.indexOf(index);
              let upTileIndex = updowntiles[updownIndex].up;
              let downTileIndex = updowntiles[updownIndex].down;
              if(index == 7){
              }
              let arrow: null | "up" | "down" = null;
              if(state.tiles[upTileIndex].tileMode == 'completed' || state.tiles[downTileIndex].tileMode == 'completed'){
                if(state.tiles[upTileIndex].arrowsTo.includes(downTileIndex)){
                  arrow = "down";
                }else if(state.tiles[downTileIndex].arrowsTo.includes(upTileIndex)){
                  arrow = "up";
                }
              }

              if(index == 7 || index == 8 || index == 9 || index == 18 || index == 19 || index == 20 || index == 29 || index == 30 || index == 31){
                extraMargin = {marginRight: "5.33%"};
              }
              return (
                <View key={index} style={{...extraMargin, ...styles.verticalArrowContainer}}>
                  {arrow && <Image source={arrow == "down" ? arrowDown : arrowUp} style={styles.verticalArrow}/>}
                </View>
              )
            }else{
              
              let left_tile = tile_coords.indexOf(index - 1);
              let right_tile = tile_coords.indexOf(index + 1);

              let arrow: null | "left" | "right" =  null;
              if( state.tiles[left_tile].tileMode == 'completed' || state.tiles[right_tile].tileMode == 'completed'){
                arrow = state.tiles[left_tile].arrowsTo.includes(right_tile) ? "right" : state.tiles[right_tile].arrowsTo.includes(left_tile) ? "left" : null;
              }

              return (
                <Image key={index} source={arrow && (arrow == "left"? arrowLeft : arrowRight)} style={styles.horizontalArrow} />
              )
            }
          })}
        </View>
      );
}

export default BoardView;

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignSelf: 'center',
      //flexBasis: "46%",
      flexBasis: "46%",
      padding: "3%",
      marginBottom: "1%",
      aspectRatio: 1,
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 15,
      bottom: 0,
    },
    horizontalArrow: {
      width: "3.33%", 
      margin:"1%", 
      aspectRatio: 10/17,
      flexShrink: 1,
    },
    verticalArrow:{
      height: "100%", 
      aspectRatio: 15/12,
      flexShrink: 1,
    },
    verticalArrowContainer:{
      width:"21%", 
      marginVertical:'0.75%', 
      height: "3.83%", 
      alignItems:'center', 
      flexShrink: 1
    }
  });
  