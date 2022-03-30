import {useContext, useState, memo} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import keyboardReducer, {keyboardContext} from './KeyboardLogic';

const Key = memo(({letter, backspace}: {letter?: string, backspace?: boolean}) => {
    const {keyboarddispatch} = useContext(keyboardContext);
    let [selected, setSelected] = useState(false);
    let style = backspace ? styles.delcard : styles.keycard;
    let highlightedStyle = selected ? styles.highlighted : {};
    if(letter == undefined && backspace){ letter = "⌫"; }
    return (
        <Pressable style={{...style, ...highlightedStyle}} onPressIn={() => setSelected(true)} onPressOut={() => setSelected(false)} onPress={() => { keyboarddispatch({type:'set-letter', payload: letter!.toLowerCase()} ) } }>
          <Text style={{fontSize: 27, color:'white', textAlignVertical:'center', textAlign:'center'}}>{letter!.toLowerCase()}</Text>
      </Pressable>
    );
});
  
  const KeyBoardRow = memo(({letters, backspace}:{letters: string, backspace?: boolean}) => {
    return (
      <View style={styles.keyboardtoprow}>
        {Array(letters.length).fill(0).map((item, i) => {
            return(<Key key={i} letter={letters[i]} />);
        })}
        {backspace && <Key backspace={true} />}
      </View>
    );
  });
  
const KeyboardInput = () => {
    let toprowletters: string = "qwertyuiop";
    let middlerowletters: string = "asdfghjkl";
    let bottomrowletters: string = "zxcvbnm";
    return (
      <>
        <View style={styles.keyboard}>
          <KeyBoardRow letters={toprowletters} />
          <KeyBoardRow letters={middlerowletters} />
          <KeyBoardRow backspace letters={bottomrowletters} />
        </View>
      </>
    );
  }

export default memo(KeyboardInput);

  const styles = StyleSheet.create({
    highlighted:{
      backgroundColor: '#E1566B',
    },
    keyboard:{
      flexDirection: 'column',
      flexBasis: '23%',
      paddingBottom: '5%',
      marginLeft: 10,
      marginRight: 10,
      alignItems: 'center',
      justifyContent: 'space-around',
    },
    keyboardtoprow:{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      marginVertical: 1,
      flexShrink: 1,
    },
    keycard:{
      borderRadius: 6,
      backgroundColor: '#293D46',
      width:'9.3%',
      height: '100%',
      margin:'0.3%',
      justifyContent: 'center',
    },
    delcard:{
      borderRadius: 6,
      backgroundColor: '#293D46',
      width:'28.8%',
      margin:'0.3%',
      justifyContent: 'center',
    },
  });
  