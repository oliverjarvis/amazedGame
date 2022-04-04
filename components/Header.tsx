import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SettingsModal from "../game/Components/Modals/SettingsModal";
const DiamondCount = ({diamongCount}) => {
    
    return (
      <View style={{flexBasis:"20%", flexShrink: 1, height:"100%",  alignItems:'center', justifyContent:'center'}}>
        <View style={{backgroundColor: 'transparent', borderRadius:999, marginHorizontal: 5, padding: 5}}>
          
        </View>
      </View>
    )
  };
  
  const SettingsIcon = ({setShowModal}: {setShowModal: any}) => {
    return (
      <TouchableOpacity onPress={() => setShowModal(true)} style={{width:"20%", flexShrink: 1, backgroundColor:'transparent'}}>
          <Text style={{fontSize: 20, textAlign: 'center', textAlignVertical:"center", color: 'black'}}>⚙️</Text>
      </TouchableOpacity>
    )
  };

export const Header = () => {
    const [showSettings, setShowSettings] = useState(false);
    return (
      <>
        <View style={{...styles.header,  paddingBottom: 10}}>
          <View style={{width: '20%'}}></View>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>Amaze</Text>
          <SettingsIcon setShowModal={setShowSettings}/>
        </View>
        {showSettings && <SettingsModal setCloseModal={setShowSettings}/>}
      </>
    );
}

let styles = StyleSheet.create({
    header: {
      flexBasis: '9.5%',
      flexGrow: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#2B4753',
      padding: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    }
  });