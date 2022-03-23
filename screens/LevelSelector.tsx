import { StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native';
import LottieView from 'lottie-react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { globalContext } from '../game/GlobalState';
import { useContext, useReducer, useRef, useState } from 'react';
import { Header } from '../game/Components/Header';

import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Shimmer from 'react-native-shimmer';
const windowHeight = Dimensions.get('window').height;


const DATA = [
  {
    id: 'easy-1',
    level_number: 1,
    title: 'Mine',
    complete: true,
    perfect: true,
  },
  {
    id: 'easy-2',
    level_number: 2,
    title: 'Snow',
    complete: true,
  },
  {
    id: 'easy-3',
    level_number: 2,
    title: 'Snow',
    complete: false,
  }
];

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
          <LottieView source={require('./layer.json')} autoPlay loop={true} style={{position:'absolute', width: "100%", zIndex: 1000}}/>
    </LinearGradient>);
}

const PerfectLevelIcon = ({item}) => {
  return (
    <>
      <View pointerEvents='none' style={{width: "22%", elevation: 4, backgroundColor: "white", aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
        <ShinyGradient>
          <Text style={{fontSize: 30, color:"#444", fontWeight: 'bold'}}>{item.level_number}</Text>
        </ShinyGradient>
      </View>
      <LottieView source={require('./4436-celebrating-stars.json')} autoPlay loop={false} style={{ position:'absolute', height: "100%", width: "100%", zIndex: 1000}}/>
      </> 
  );
}

const CompletedLevelIcon = ({item}) => {
  return (
    <TouchableOpacity onPress={() => console.log("hello")}>
      <View style={{width: "22%", backgroundColor: "transparent", aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
          <View style={{width: "80%", elevation: 0, backgroundColor: "gold", aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
            <Text style={{fontSize: 30, color:"#444", fontWeight: 'bold'}}>{item.level_number}</Text>
          </View>
      </View>
      </TouchableOpacity>
  );
}

const OpenLevelIcon = ({item}) => {
  return (
      <View style={{width: "22%", backgroundColor: "transparent", aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
          <View style={{width: "80%", elevation: 1, backgroundColor: "#E4C5ED", aspectRatio: 1, borderRadius: 999, justifyContent: 'center', alignItems: 'center', overflow: 'hidden'}}>
            <Text style={{fontSize: 30, color:"#444", fontWeight: 'bold'}}>{item.level_number}</Text>
          </View>
      </View>
  );
}

const DifficultyButton = ({ text, onPress, selected }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{width: "25%", height: "70%", backgroundColor: selected ? '#E4C5ED' : 'white', borderRadius: 10, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, color: "#444", fontWeight: 'bold'}}>{text}</Text>
    </TouchableOpacity>
  );
}



export default function LevelSelector({ navigation }) {
  let level_count = 30;
  
  const Item = ({ item, backgroundColor, textColor }) => (
    <View style={{backgroundColor: 'white', height: windowHeight / 3}}>
      <View style={{backgroundColor:'transparent', flex: 1, flexDirection: "column", alignItems: 'center'}}>
        <View style={{alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent'}}>
          {item.complete && item.perfect && <PerfectLevelIcon item={item}/>}
          {item.complete && !item.perfect && <CompletedLevelIcon item={item}/>}
          {!item.complete && <OpenLevelIcon item={item}/>}
          <Text style={{color: 'black', fontWeight: 'bold', marginTop: 10, fontSize: 20}}>‘{item.title}’</Text>
        </View>
      </View>
    </View>
  );
  
  const renderItem = ({ item }) => {
    function actionOnRow() {
      console.log('Selected Item :');
    }

    return (
      <TouchableOpacity onPress={() => actionOnRow()}>
        <Item
          item={item}
          backgroundColor={{ backgroundColor: "transparent" }}
          textColor={{ color: "#444" }}
        />
      </TouchableOpacity>
    );
  };


  const { state } = useContext(globalContext);
  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard'>('easy');

  const flatListRef = useRef<FlatList>();

  const handleItemPress = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: "#fff"}}>
         <FlatList 
          initialScrollIndex={2} 
          ref={flatListRef} 
          contentContainerStyle={{paddingTop: windowHeight / 2.1, paddingBottom: windowHeight / 5}} 
          data={DATA} 
          style={{flex:1}} 
          renderItem={renderItem} 
          keyExtractor={item => item.id} 
        />
      </View>
      <LinearGradient
        // Background Linear Gradient
        start ={{x: 0, y: 0}}
        end = {{x:0, y:1}}
        colors={['transparent','transparent',  'transparent',  'transparent', 'transparent',  'transparent', 'rgba(0,0,0,0.6)']}
        style={{...styles.background}}/>
      <View style={{backgroundColor: 'white', height: windowHeight / 10, width: "100%", flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly'}}>
        <DifficultyButton onPress={() => {setDifficulty("easy"); handleItemPress("1")}} selected={difficulty == "easy"} text="Easy"/>
        <DifficultyButton onPress={() => setDifficulty("normal")} selected={difficulty == "normal"} text="Normal"/>
        <DifficultyButton onPress={() => setDifficulty("hard")} selected={difficulty == "hard"} text="Hard"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#fff',
    height:"100%",
    justifyContent: 'space-between',
  },
  background:{
    position: 'absolute',
    left: 0,
    height: "100%",
    right: 0,
  },
  level_container: {
    flexDirection: 'row',
    paddingHorizontal: "5%",
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'transparent',
  },
  title: {
    color: '#888',
    fontSize: 20,
    fontWeight: 'bold',
  },
  square: {
    backgroundColor: 'white',
    width: "18%",
    aspectRatio: 1,
    height: 60,
    margin: "3%",
    borderRadius: 5,
    justifyContent:"center"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});


/*{Array(level_count).fill(0).map((_, i) => (
          <TouchableOpacity onPress={ () => navigation.navigate('GameScreen', {level_id: i+1})} key={i} style={styles.square}>
            <Text style={{textAlign:'center', textAlignVertical:'center', color:"#444", fontSize:25, fontWeight:'bold'}}>{i+1}</Text>
          </TouchableOpacity>
        ))}*/