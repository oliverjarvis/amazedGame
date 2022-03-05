import React, { useContext, useReducer, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { gameReducer, gameManagerContext, initialState, gameStateInitializer} from "./GameLogic";
import Tile from '../components/Tile';
//import logo from '../assets/logo.png';
const dictionary: dictionaryData = require('../assets/leveldata/four-word-defs.json');

interface dictionaryData{
    [key: string]: {
        word: string,
        wordset_id: string,
        meanings: {
          id: string, 
          def: string, 
          example:string, 
          speech_part: string
        }[]
        editors: string[],
        contributors: string[],
    }
}

function BoardView() {  
    const {state, dispatch} = useContext(gameManagerContext);
    return (
        <View style={styles.container}>
        {state.tiles.map((item, i) => {
            return (<Tile key={i} tile={item} />);
            })}
        </View>);
}

const ActionBoardView = () => {
  const {state, dispatch} = useContext(gameManagerContext);
  const textinputRef = useRef<TextInput>(null);
  return (
    <View style={styles.actionboard}>
      <Text style={{color:"#444", fontSize: 30, fontWeight:'bold', textAlign:'center'}}>{state.hasWon? "YOU WIN!":dictionary[state.currentWord].meanings[0].def}</Text>
      <TextInput
        ref={textinputRef}
        onSubmitEditing={(event) => {
          dispatch({type: "validate-answer", payload: {guess: event.nativeEvent.text, tileIndex: state.selectedTileIndex}});
          textinputRef.current?.clear();
        }}
        caretHidden={true}
        autoCapitalize='characters'
        placeholder='XXXX'
        style={styles.input}
      />
    </View>
  );
}

const Game = () => {

    const [state, dispatch] = useReducer(gameReducer, initialState, gameStateInitializer);
    
    return (<gameManagerContext.Provider value={ {state, dispatch} }>
                <ActionBoardView/>
                <BoardView/>
            </gameManagerContext.Provider>);
}

export default Game;


const styles = StyleSheet.create({
    input:{
      height: 100,
      fontSize: 50
    },
    actionboard:{
      backgroundColor:'#F7EDED',
      flex: 1,
      flexDirection: 'column',
      borderRadius: 15,
      marginLeft: 30,
      marginRight: 30,
      marginBottom: 10,
      padding: 20,
      marginTop: 40,
      alignItems: 'center',
      justifyContent: 'center' 
    },
    window: {
      backgroundColor:'#E8F6F6',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between' 
    },
    container: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: "wrap",
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      bottom: 0,
      marginLeft:30,
      marginRight:30,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    button:{
      backgroundColor: '#fff',
      width: '95%',
      aspectRatio: 1,
      borderRadius: 4,
    },
    buttonText:{
      height: '100%',
      width: '100%',
      padding: 6,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',
      color: '#444'
    },
    logo: {width: 302, height:  90}
  });
  