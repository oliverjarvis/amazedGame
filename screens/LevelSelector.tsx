import { StyleSheet } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { globalContext } from '../game/GlobalState';
import { useContext, useEffect, useReducer, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { easylevels } from '../assets/levels/easy/levels_metadata';

import { Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const windowHeight = Dimensions.get('window').height;

import {OpenLevelIcon, PerfectLevelIcon, CompletedLevelIcon, DifficultyButton} from '../components/LevelSelectorComponents';


export default function LevelSelector({ navigation }) {
  
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }



  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem('@easy-1')
      if(value !== null) {
        // value previously stored
        setData([JSON.parse(value)]);
      }else{
        //if empty we must add atleast one, right?
        const LEVEL_KEY = "@easy-1";
        const level_data = {
          ...easylevels[0],
          completed: false,
          perfect: false,
        }
        storeData(LEVEL_KEY, JSON.stringify(level_data));
        console.log("added level 1");
      }
    } catch(e) {
      console.log("No data attached")
    }
  }

  useEffect(() => {
    getData("@easy-1")
  }, [])

  const [data, setData] = useState([]);

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

  const clearAsyncStorage = async() => {
    AsyncStorage.clear();
    console.log("byebye");
  }

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
          initialScrollIndex={0} 
          ref={flatListRef} 
          contentContainerStyle={{paddingTop: windowHeight / 2.1, paddingBottom: windowHeight / 5}} 
          data={data} 
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
        <DifficultyButton onPress={() => {setDifficulty("easy"); handleItemPress("0"); clearAsyncStorage()}} selected={difficulty == "easy"} text="Easy"/>
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