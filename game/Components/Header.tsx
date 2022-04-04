import { memo, useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gameManagerContext } from "../GameLogic";
import { ProgressBar } from "./ProgressBar";




const SettingsIcon = memo(() => {
  return (
    <View style={{flexBasis:"20%", flexShrink: 1, backgroundColor:'transparent'}}>
        <Text style={{fontSize: 20, textAlign: 'center', textAlignVertical:"center", color: 'black'}}>⚙️</Text>
    </View>
  )
});

export const Header = memo(({level_id}:{level_id? : number}) => {
    const levelCompletionTime = 160.0;
    const {state, dispatch} = useContext(gameManagerContext);

    const [time, setTime] = useState(levelCompletionTime);
    const [deltaTime, setDeltaTime] = useState(0);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if(!state.gameOver){
        let interval = setInterval(() => {
          setTime(time => time - 0.1);
        }, 100);
        if(time <= 0){
          dispatch({type:"game-over"});
        }
        return () => clearInterval(interval);
      }
      }, [time]);
    
    useEffect(() => {
      if(!state.gameOver){
        setTime(levelCompletionTime);
      }
    }, [state.gameOver])

      
    return (
        <View style={{...styles.header, paddingTop:insets.top, paddingBottom: 10}}>
          <View style={{width: "20%"}}></View>
            <View style={{flexDirection:"column", flexBasis: "60%",  alignItems:"center"}}>
            <Text style={{color: 'white', fontSize:25, fontWeight: 'bold', paddingBottom: 10, paddingTop: 10, textAlign:"center"}}>Level {level_id + 1}</Text>
            <ProgressBar height={20} width={250} />
            </View>
            <SettingsIcon/>
        </View>
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