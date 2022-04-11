import { memo, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';
import { gameManagerContext } from '../GameLogic';

const dictionary: dictionaryData = require('../../assets/DICTIONARY.json');

const ActionBoard = () => {
    const { state } = useContext(gameManagerContext);
    
    const dictionaryDef = Object.keys(dictionary).includes(state.currentWord) ? dictionary[state.currentWord][state.levelDifficulty] : "";

    return (
      <View style={styles.actionboard}>
        <Text adjustsFontSizeToFit={true} numberOfLines={2} style={{color:"#eee", fontSize:70, fontWeight:'bold', textAlign:'left'}}>{state.hasWon? "YOU WIN!":dictionaryDef}</Text>
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
        backgroundColor: 'transparent',
        borderRadius: 0,
        width: '90%',
        height: '10%',
        padding: 0, 
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

export default memo(ActionBoard);