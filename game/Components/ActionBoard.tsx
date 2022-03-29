import { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { gameManagerContext } from '../GameLogic';

const dictionary: dictionaryData = require('../../assets/dictionary/four-word-defs.json');

const ActionBoard = () => {
    const {state, dispatch} = useContext(gameManagerContext);
    
    const dictionaryDef = Object.keys(dictionary).includes(state.currentWord) ? dictionary[state.currentWord].meanings[0].def : "";

    return (
      <View style={styles.actionboard}>
        <Text adjustsFontSizeToFit={true} numberOfLines={2} style={{color:"#444", fontSize:70, fontWeight:'bold', textAlign:'left'}}>{state.hasWon? "YOU WIN!":dictionaryDef}</Text>
      </View>
    );
  }

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

const styles= StyleSheet.create({
    actionboard:{
        flexDirection: 'column',
        borderRadius: 0,
        flexBasis: '6%',
        width: '90%',
        flex: 1,
        marginVertical:"1.25%",
        padding: 0, 
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

export default ActionBoard;