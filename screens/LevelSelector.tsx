import { useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, View, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setActiveLevel } from '../redux/actions';
import { LevelMeta, CompletionType} from '../redux/interfaces';

import { easylevels } from '../assets/levels/easy/levels_metadata';
import { normallevels } from '../assets/levels/normal/levels_metadata';
import { hardlevels } from '../assets/levels/hard/levels_metadata';

import { 
  OpenLevelIcon, 
  PerfectLevelIcon, 
  CompletedLevelIcon, 
  LockedLevel, 
  DifficultyButton 
} from '../components/LevelSelectorComponents';

let levels_by_difficulty = {
  "easy" : easylevels,
  "normal" : normallevels,
  "hard": hardlevels
}

const windowHeight = Dimensions.get('window').height;


// Main Screen
export default function LevelSelector({ navigation }) {

  const levelmanager = useSelector((state: RootState) => state.levelmanager);
  const dispatch = useDispatch();

  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard' | null>(null);
  const [refreshFlatlist, setRefreshFlatlist] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setDifficulty('easy');
  }, [])

  useEffect(() => {
    console.log(levelmanager.activeLevel);
  }, [levelmanager.activeLevel])

  useEffect(() => {
    setData(levelmanager.levels.filter(item => item.levelDifficulty == difficulty));
  }, [difficulty]);

  useEffect(() => {
    const scrolloffset = 2;
    setRefreshFlatlist(!refreshFlatlist);
    let scrollTo = data.findIndex(item=>item.completionType == CompletionType.unlocked);
    scrollTo = windowHeight / 3 * scrollTo;
    flatListRef?.current?.scrollToOffset({ animated: true, offset:scrollTo });
  }, [data])

      
  function handleLevelpress(item){
    dispatch(setActiveLevel(item.levelID, item.levelDifficulty));
    navigation.navigate('GameScreen', {levelID: item.levelID, levelDifficulty: item.levelDifficulty});
  };
 
  // Item element
  const Item = ({ item }: {item: LevelMeta}) => {

    return(
       <>
       <ActivityIndicator/>
        <View style={{backgroundColor: 'white', height: windowHeight / 3}}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleLevelpress(item)} style={{opacity: 1, backgroundColor:'transparent', flex: 1, flexDirection: "column", alignItems: 'center'}}>
            <View style={{alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent'}}>
              {item.completionType == CompletionType.perfected && <PerfectLevelIcon item={item}/>}
              {item.completionType == CompletionType.completed &&  <CompletedLevelIcon item={item}/>}
              {item.completionType == CompletionType.unlocked && <OpenLevelIcon item={item}/>}
              {item.completionType == CompletionType.locked && <LockedLevel item={item}/>}
              <Text style={{color: 'black', fontWeight: 'bold', marginTop: 10, fontSize: 20}}>‘hello’</Text>
          </View>
        </TouchableOpacity>
        </View>
      </>
    );
  };
  
  // RenderItem element
  const renderItem = ({ item }) => {
    return (
        <Item 
          item={item} 
        />
    );
  };

  const flatListRef = useRef<FlatList>();

  const handleItemPress = (index) => {
    flatListRef.current.scrollToIndex({ animated: true, index });
  };

  let scrollTo = data.findIndex(item=>item.completionType == CompletionType.unlocked);
  scrollTo = windowHeight / 3 * scrollTo;
  flatListRef?.current?.scrollToOffset({ animated: true, offset:scrollTo });

  // Render
  return (
    <View style={styles.container}>
      <View style={{flex: 1, backgroundColor: "#fff"}}>
         {data.length > 0 && <FlatList 
          initialScrollIndex={0} 
          onScrollToIndexFailed={info => {
            const wait = new Promise(resolve => setTimeout(resolve, 100));
            wait.then(() => {
              flatListRef.current?.scrollToIndex({ index: 2, animated: true });
            });
          }}
          ref={flatListRef} 
          extraData={refreshFlatlist}
          contentContainerStyle={ { paddingTop: windowHeight / 2.1, paddingBottom: windowHeight / 5 } } 
          data={data} 
          style={ { flex:1 } } 
          renderItem= {renderItem} 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor= {item => {return ( item.levelDifficulty + item.levelID); } } 
        />}
      </View>
      <LinearGradient
        start ={{x: 0, y: 0}}
        end = {{x:0, y:1}}
        pointerEvents = "none"
        colors={['transparent','transparent',  'transparent',  'transparent', 'transparent',  'transparent', 'rgba(0,0,0,0.6)']}
        style={{...styles.background}}/>
      <View style={ { backgroundColor: 'white', height: windowHeight / 10, width: "100%", flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly' } }>
        <DifficultyButton onPress={() => {setDifficulty("easy"); handleItemPress(0);}} selected={difficulty == "easy"} text="Easy"/>
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