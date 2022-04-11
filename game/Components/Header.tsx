import { memo, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers";
import { gameManagerContext } from "../GameLogic";
import InGameSettingsModal from "./Modals/InGameSettingsModal";
import { SkipPowerup } from "./PowerupBar";
import { ProgressBar } from "./ProgressBar";

let gearIcon = require("../../assets/images/gearIcon.png")

//        <Text style={{fontSize: 20, textAlign: 'center', textAlignVertical:"center", color: 'black'}}>⚙️</Text>



const SettingsIcon = memo(({onPress}:{onPress: any}) => {
  return (
    <TouchableOpacity onPress={() => onPress(true)} style={{width:"20%", height: '100%', justifyContent:'center', alignItems:'center', flexShrink: 1, backgroundColor:'transparent'}}>
        <View style={{height: "50%", flexShrink: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={gearIcon} style={{flexShrink: 1, aspectRatio: 1, height: "100%"}}/>
        </View>
    </TouchableOpacity>
  )
});

export const Header = memo(({setSettingsPressed, level_id}:{level_id? : number, setSettingsPressed: any}) => {
    const levelCompletionTime = 160.0;
    const {state, dispatch} = useContext(gameManagerContext);
    
    const insets = useSafeAreaInsets();

    //const [settingsPressed, setSettingsPressed] = useState(false);

    function progressBarFinish(){
      dispatch({type: "game-over"});
    }
    
  
    return (
        <>
        <View style={{...styles.header, paddingTop:insets.top, paddingBottom: 10}}>
          <View style={{width: "20%"}}></View>
            <View style={{flexDirection:"column", flexBasis: "60%",  alignItems:"center", backgroundColor: 'transparent'}}>
              <Text style={{color: 'white', fontSize:21, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10, textAlign:"center"}}>Level {level_id + 1}</Text>
              <ProgressBar duration={100000} isPaused={state.isPaused} height={20} width={"100%"} callback={progressBarFinish}/>
            </View>
            <SettingsIcon onPress={setSettingsPressed}/>
        </View>
        </>
    );
});

let styles = StyleSheet.create({
    header: {
      height: '10%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      padding: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
    }
  });