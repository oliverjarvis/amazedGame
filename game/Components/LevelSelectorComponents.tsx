import { LinearGradient } from "expo-linear-gradient";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { memo } from "react";

const ShinyGradient = (props: any) => {
    return (
      <LinearGradient
          // Background Linear Gradient
          start ={{x: 0, y: 0}}
          end = {{x:1.0, y:1}}
          pointerEvents='none'
          colors={['rgba(255, 208, 0, 1.0)', 'rgba(253, 208, 0, 0.9)', 'rgba(255, 208, 0, 0.5)','rgba(253, 208, 0, 0.9)', 'rgba(253, 208, 0, 1.0)']}
          style={{height: "80%", justifyContent: 'center', alignItems: 'center', aspectRatio: 1, borderRadius:9999, overflow: 'hidden'}}>
            {props.children}
            <LottieView source={require('../../assets/lottiefiles/layer.json')} autoPlay loop={true} style={{position:'absolute', width: "100%", zIndex: 1000}}/>
      </LinearGradient>);
  }
  
  const LevelIcon = memo(({backgroundColor, itemid}: {backgroundColor: string, itemid: number}) => (
    <View style={{width: "22%", backgroundColor: "transparent", aspectRatio: 1, borderRadius: 0, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
      <View style={{width: "80%", elevation: 1, backgroundColor: backgroundColor, aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
        <Text style={{fontSize: 30, color:"#444", fontWeight: 'bold'}}>{itemid + 1}</Text>
      </View>
    </View>));

  export const PerfectLevelIcon = ({item}) => {
    return (
      <>
        <View pointerEvents='none' style={{width: "22%", elevation: 4, backgroundColor: "white", aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
          <ShinyGradient>
            <Text style={{fontSize: 30, color:"#444", fontWeight: 'bold'}}>{item.levelID + 1}</Text>
          </ShinyGradient>
        </View>
        <LottieView source={require('../../assets/lottiefiles/4436-celebrating-stars.json')} autoPlay loop={false} style={{ position:'absolute', height: "100%", width: "100%", zIndex: 1000}}/>
        </> 
    );
  }
  
  export const CompletedLevelIcon = ({item}) => (
    <LevelIcon backgroundColor={"gold"} itemid = {item.levelID}/>
  );
  
  export const OpenLevelIcon = ({item}) => (
    <LevelIcon backgroundColor={"#E4C5ED"} itemid = {item.levelID}/>
  );

  export const LockedLevel = ({item}) => (
    <LevelIcon backgroundColor={"lightgray"} itemid = {item.levelID}/>
  );

  export const DifficultyButton = ({ text, onPress, selected }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{width: "25%", height: "70%", backgroundColor: selected ? '#E4C5ED' : 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 20, color: "#444", fontWeight: 'bold'}}>{text}</Text>
      </TouchableOpacity>
    );
  }
  