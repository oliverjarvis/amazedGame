import React, { useContext } from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {gameManagerContext, initialState, TileState} from '../game/GameLogic';

function index_to_xy(index:number){
  let x = index % 4
  let y = Math.floor(index / 4);
  return {x:x, y:y};
}

export default function Tile({tile}: {tile: TileState}) {
  const {state, dispatch} = useContext(gameManagerContext);
  let tileStyle = styles.blank;
  if(tile.tileMode == 'completed'){
    tileStyle = styles.completed;
  }
  else if(tile.tileMode == 'open'){
    if(tile.selected){
      tileStyle = styles.selected;
    }else{
      tileStyle = styles.open;
    }
  }

  let currentTileCoords = index_to_xy(tile.tileIndex);

  let outerStyle = styles.outer

  let leftborder = true;
  let rightborder = true;
  let topborder = true;
  let bottomborder = true;

  if(tile.tileMode == 'completed'){
    tile.adjacent_to.forEach((item) => {
      console.log(tile.word);
      let adjacent_xy = index_to_xy(item);
      console.log(adjacent_xy);
      if(adjacent_xy.y < currentTileCoords.y){ console.log("a"); topborder = false; }
      else if(adjacent_xy.y > currentTileCoords.y){ console.log("b"); bottomborder = false; }
      else if(adjacent_xy.x > currentTileCoords.x){ console.log("c"); rightborder = false;  }
      else if(adjacent_xy.x < currentTileCoords.x){ console.log("d"); leftborder = false;  }
    });

  if(topborder){
    outerStyle = {...outerStyle, ...styles.top}
  }
  if(leftborder){
    outerStyle = {...outerStyle, ...styles.left}; 
  }
  if(rightborder){
    outerStyle = {...outerStyle, ...styles.right};
  }
  if(bottomborder){
    outerStyle = {...outerStyle, ...styles.bottom};
  }
  }

  return (
      <View style={outerStyle}>
      <TouchableOpacity
        disabled={tile.tileMode == 'completed' || tile.tileMode == 'blank' || tile.selected}
        onPress={() => {dispatch( {type: 'select-tile', payload: tile.tileIndex} )}}
        style={tileStyle}>
        {tile.tileMode == "completed" && <Text style={styles.buttonText}>{tile.word.toUpperCase()}</Text>}
      </TouchableOpacity>
    </View>
    );
}

const styles = StyleSheet.create({
    outer:{
      alignContent: "center",
      justifyContent: "center",
      width: '25%',
      backgroundColor: 'transparent',
      aspectRatio: 1,
    },
    top:{
      borderTopWidth: 2,
      borderTopColor: "black",
    },
    left:{
      borderLeftWidth: 2,
      borderLeftColor: "black",
    },
    right:{
      borderRightWidth: 2,
      borderRightColor: "black",
    },
    bottom:{
      borderBottomWidth: 2,
      borderBottomColor: "black",
    },
    blank:{
      backgroundColor: '#fff',
      width: '95%',
      aspectRatio: 1,
      borderRadius: 4,
    },
    completed:{
      backgroundColor: 'gold',
      width: '95%',
      aspectRatio: 1,
      borderRadius: 4,
    },
    open:{
      backgroundColor: 'lightgreen',
      width: '95%',
      aspectRatio: 1,
      borderRadius: 4,
    },
    selected:{
      backgroundColor: 'green',
      width: '95%',
      aspectRatio: 1,
      borderRadius: 4,
    },
    buttonText:{
      height: '100%',
      width: '100%',
      padding: 6,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#444'
    },
  });
  