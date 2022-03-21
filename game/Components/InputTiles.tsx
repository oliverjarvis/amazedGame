import {useState, useContext, useEffect} from 'react';
import {View, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';

import {gameManagerContext} from '../GameLogic';
import {keyboardContext} from './Keyboard/KeyboardLogic';
import {HintPowerup, SkipPowerup} from './PowerupBar';

let arrowRight = require('../../assets/arrowright.png');

function index_to_xy(index:number){
  let x = index % 4
  let y = Math.floor(index / 4);
  return {x:x, y:y};
}

const InputTiles = () => {
  const {keyboardstate} = useContext(keyboardContext);
  const {state, dispatch} = useContext(gameManagerContext);
  let tile_count = 4;
  const [keyboardActive, setKeyboardActive] = useState(state.selectedTileIndex != -1);
  const [textValue, setTextValue] = useState("");
  const [fontcolor, setFontcolor] = useState("#444");

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

  useEffect(() => {
    setFontcolor(state.selectedTileIndex == -1 ? '#fff' : "#F2A6B1");
  }, [state.selectedTileIndex])

  /*let currentTileCoords = index_to_xy(tile.tileIndex);
  let leftborder = true;
  let rightborder = true;
  let topborder = true;
  let bottomborder = true;*/

  /*if(tile.tileMode == 'completed'){
    tile.adjacent_to.forEach((item) => {
      let adjacent_xy = index_to_xy(item);
      if(adjacent_xy.y < currentTileCoords.y){ topborder = false; }
      else if(adjacent_xy.y > currentTileCoords.y){ bottomborder = false; }
      else if(adjacent_xy.x > currentTileCoords.x){ rightborder = false;  }
      else if(adjacent_xy.x < currentTileCoords.x){ leftborder = false;  }
    })*/

  return (
        <View style={styles.outerboard}>
          <SkipPowerup onPress={() => dispatch({type:'skip-word'})}/>
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
          <HintPowerup onPress={() => dispatch({type:'skip-word'})}/>
        </View>
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