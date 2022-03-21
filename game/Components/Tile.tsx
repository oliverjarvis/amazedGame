import React, { useContext } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {gameManagerContext, initialState, TileState} from '../GameLogic';
let Goal = require('../../assets/goal2.png');


export default function Tile({tile}: {tile: TileState}) {

  const {state, dispatch} = useContext(gameManagerContext);

  
  let tileInsetStyle = styles.inset;
  let tileOutsetStyle = styles.outset;

  switch(tile.tileMode){
    case "completed":
      tileInsetStyle = {...tileInsetStyle, ...styles.insetCompleted};
      tileOutsetStyle = {...tileOutsetStyle, ...styles.outsetCompleted};
      break;
    case "open":
      if(tile.selected){
        tileInsetStyle = {...tileInsetStyle, ...styles.insetSelected};
        tileOutsetStyle = {...tileOutsetStyle, ...styles.outsetSelected};
      }else{
        tileInsetStyle = {...tileInsetStyle, ...styles.insetOpen};
        tileOutsetStyle = {...tileOutsetStyle, ...styles.outsetOpen};
      }
      break;
    case "blank":
      tileInsetStyle = {...tileInsetStyle, ...styles.insetBlank};
      tileOutsetStyle = {...tileOutsetStyle, ...styles.outsetBlank};
  }


  let outerStyle = styles.outer;

  return (
      <View style={styles.outer}>
        <TouchableOpacity
          disabled={tile.tileMode == 'completed' || tile.tileMode == 'blank' || tile.selected}
          onPress={() => {dispatch( {type: 'select-tile', payload: tile.tileIndex} )}}
          style={tileInsetStyle}>
            <View style={tileOutsetStyle}>
              {tile.tileMode != "completed" && tile.tileIndex == 15? <Image source={Goal} style={styles.endGoal} />: null}
              { tile.tileMode == "completed" && <Text style={styles.buttonText}>{tile.word.toLowerCase()}</Text>}
            </View>
        </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    outer:{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: 'transparent',
      alignItems: 'center',
      justifyContent: "center",
      margin: -0.05,
      flexBasis: '21%',
      aspectRatio: 1,
      flexShrink: 1
    },
    outset:{
      width: '100%',
      height: '92%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    outsetCompleted:{
      backgroundColor: '#FFCC00',
    },
    outsetOpen:{
      backgroundColor: '#65C877',
    },
    outsetSelected:{
      backgroundColor: '#21712F',
    },
    outsetBlank:{
      backgroundColor: 'transparent',
    },
    inset:{
      alignContent: "center",
      width: '100%',
      aspectRatio: 1,
      borderRadius: 10,
      justifyContent: 'flex-start'
    },
    insetCompleted:{
      backgroundColor: '#A88600',
    },
    insetBlank:{
      backgroundColor: 'transparent',
    },
    insetOpen:{
      backgroundColor: '#21712F',
    },
    insetSelected:{
      backgroundColor: '#214422',
    },
    endGoal:{
      height: '90%',
      aspectRatio: 1,
    },
    buttonText:{
      width: '100%',
      padding: 6,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#444'
    },
  });

/*
let currentTileCoords = index_to_xy(tile.tileIndex);
let leftborder = true;
let rightborder = true;
let topborder = true;
let bottomborder = true;

if(tile.tileMode == 'completed'){
  tile.adjacent_to.forEach((item) => {
    let adjacent_xy = index_to_xy(item);
    if(adjacent_xy.y < currentTileCoords.y){ topborder = false; }
    else if(adjacent_xy.y > currentTileCoords.y){ bottomborder = false; }
    else if(adjacent_xy.x > currentTileCoords.x){ rightborder = false;  }
    else if(adjacent_xy.x < currentTileCoords.x){ leftborder = false;  }
  });*/