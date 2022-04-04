import { memo } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native"

const typedMemo: <T>(c: T) => T = memo;


const Button = ( { text, powerupcount, onPress }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.insetStyle}>
        <View style={styles.outsetStyle}>
          <Text style={{fontSize: 14,  fontWeight:'bold', textAlign: 'center', padding:0, textAlignVertical:"center", color: '#fff'}}>{ powerupcount }</Text>
          <Text style={{fontSize: 14,  fontWeight:'bold', textAlign: 'center', padding:2, textAlignVertical:"center", color: '#fff'}}>{ text }</Text>
        </View>
      </TouchableOpacity>
      );
};

const MemoButton = typedMemo(Button);

export const HintPowerup = ({onPress, powerupcount}) => {
  return <MemoButton powerupcount={powerupcount} onPress={onPress} text="Hint"/>; 
};

export const SkipPowerup = ({onPress, powerupcount}) => {
  return <MemoButton powerupcount={powerupcount} onPress={onPress} text="Skip"/>; 
}

let styles = StyleSheet.create({
  insetStyle:{
    flexShrink:1,
    aspectRatio: 1,
    alignContent: "center",
    borderRadius: 5,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  outsetStyle:{
    width: "100%",
    height: '100%',
    borderColor: "#aaa",
    borderWidth: 2,
    padding: "2.5%",
    borderRadius: 999,
    justifyContent: 'center',
    backgroundColor: '#444',
  },
});
