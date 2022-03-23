import { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gameManagerContext } from "../GameLogic";
import { globalContext } from "../GlobalState";
import { ProgressBar } from "./ProgressBar";


const DiamondCount = ({diamongCount}) => {
    
    return (
      <View style={{flexBasis:"20%", flexShrink: 1, height:"100%",  alignItems:'center', justifyContent:'center'}}>
        <View style={{backgroundColor: 'white', borderRadius:999, marginHorizontal: 5, padding: 5}}>
          <Text style={{fontSize: 20, textAlign: 'center', color: 'black', fontWeight: 'bold'}}>💎 {diamongCount}</Text>
        </View>
      </View>
    )
  };
  
  const SettingsIcon = () => {
    return (
      <View style={{flexBasis:"20%", flexShrink: 1, backgroundColor:'transparent'}}>
          <Text style={{fontSize: 20, textAlign: 'center', textAlignVertical:"center", color: 'black'}}>⚙️</Text>
      </View>
    )
  };

export const Header = ({level_id}:{level_id? : number}) => {
    const levelCompletionTime = 200.0;
    const {state, dispatch} = useContext(gameManagerContext);
    const globalState = useContext(globalContext);

    const [time, setTime] = useState(levelCompletionTime);
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

      
    return (
        <View style={{...styles.header, paddingTop:insets.top, paddingBottom: 10}}>
            <DiamondCount diamongCount={globalState.state.total_stars}/>
            <View style={{flexDirection:"column", flexBasis: "60%",  alignItems:"center"}}>
            <Text style={{color: 'white', fontSize:20, fontWeight: 'bold', paddingBottom: 5, textAlign:"center"}}>Level {level_id}</Text>
            <ProgressBar height={25} width={200} progress={time/levelCompletionTime} />
            </View>
            <SettingsIcon/>
        </View>
    );
}

let styles = StyleSheet.create({
    header: {
      flexBasis: '9.5%',
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#293D46',
      padding: 10,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    }
  });