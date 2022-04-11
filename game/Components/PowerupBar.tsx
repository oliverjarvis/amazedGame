import { memo, useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native"
import SettingsModal from "./Modals/SettingsModal";

const typedMemo: <T>(c: T) => T = memo;
let powerupImage = require("../../assets/images/powerupbutton2.png");


const Button = ( { text, powerupcount, onPress }) => {

    const [showModal, setShowModal] = useState(true);

    return (
      <>
      <TouchableOpacity onPress={onPress} style={styles.insetStyle}>
        <View style={styles.imageContainerStyle}>
          <Image source={powerupImage} style={{width: "100%", aspectRatio: 1, flexShrink: 1}}/>
          <View style={{position:'absolute', height: "100%", justifyContent: 'center', alignItems: 'center'}}>
            <View style={{width: "80%", padding: 2, borderRadius: 20, backgroundColor: '#E47070', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 13, fontWeight: 'bold', textAlign: 'center', padding:0, textAlignVertical:"center", color: '#fff'}}>{ powerupcount }</Text>
            </View>
            <Text style={{fontSize: 20, textAlign: 'center', padding:0, fontWeight: 'bold', textAlignVertical:"center", color: '#fff'}}>{ text }</Text>
          </View>
        </View>
      </TouchableOpacity>
      </>
      );
};

const MemoButton = typedMemo(Button);

export const HintPowerup = ({onPress, powerupcount}) => {
  //return <MemoButton powerupcount={powerupcount} onPress={onPress} text="Hint"/>; 
  return (
    <View style={styles.insetStyleEmpty}>

    </View>
  )
};

export const SkipPowerup = ({onPress, powerupcount}) => {
  return <MemoButton powerupcount={powerupcount} onPress={onPress} text="Skip"/>; 
}

let styles = StyleSheet.create({
  insetStyle:{
    flexShrink:1,
    width: "15%",
    aspectRatio: 1,
    alignContent: "center",
    borderRadius: 5,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  insetStyleEmpty:{
    flexShrink:1,
    width: "0%",
    aspectRatio: 1,
    alignContent: "center",
    borderRadius: 5,
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  imageContainerStyle:{
    width:"100%", 
    aspectRatio: 1,
    alignItems:'center', 
    flexShrink: 1,
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
