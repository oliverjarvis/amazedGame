import { useEffect, useMemo, useRef, useState, memo } from 'react';
import { ActivityIndicator, TouchableOpacity, FlatList, StyleSheet, View, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/reducers';
import { setActiveLevel, updateHandoutDate } from '../redux/actions';
import { LevelMeta, CompletionType} from '../redux/interfaces';

import { easylevels } from '../assets/levels/easy/levels_metadata.js';
import { normallevels } from '../assets/levels/normal/levels_metadata.js';
import { hardlevels } from '../assets/levels/hard/levels_metadata.js';

import { Header } from "../Components/Header";

import { 
  OpenLevelIcon, 
  PerfectLevelIcon, 
  CompletedLevelIcon, 
  LockedLevel, 
  DifficultyButton 
} from '../game/Components/LevelSelectorComponents';
import { diff, useAnimatedStyle, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import PrizeModal from '../game/Components/Modals/PrizeModal';

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

  const [difficulty, setDifficulty] = useState<'easy' | 'normal' | 'hard' | null>("easy");
  const [refreshFlatlist, setRefreshFlatlist] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(levelmanager.levels.filter(item => item.levelDifficulty == difficulty));
  }, [difficulty]);

  useEffect(() => {
    const scrolloffset = 2;
    setRefreshFlatlist(!refreshFlatlist);
    let scrollTo = data.findIndex(item=>item.completionType == CompletionType.unlocked);
    scrollTo = (windowHeight * 0.8) / 3 * scrollTo;
    flatListRef?.current?.scrollToOffset({ animated: true, offset:scrollTo });
  }, [data])

      
  function handleLevelpress(item){
    dispatch(setActiveLevel(item.levelID, item.levelDifficulty));
    navigation.navigate('GameScreen', {levelID: item.levelID, levelDifficulty: item.levelDifficulty});
  };
 
  // Item element
  const Item = memo(({ item }: {item: LevelMeta}) => {
    let levels = difficulty == "easy" ? easylevels : difficulty == "normal" ? normallevels : hardlevels;
    return(
       <>
        <View style={{backgroundColor: '26303F', height: windowHeight / 3}}>
          <TouchableOpacity activeOpacity={0.8} disabled={item.completionType == CompletionType.locked} onPress={() => handleLevelpress(item)} style={{opacity: 1, backgroundColor:'transparent', flex: 1, flexDirection: "column", alignItems: 'center'}}>
            <View style={{alignItems: 'center', justifyContent: 'flex-start', backgroundColor: 'transparent'}}>
              {item.completionType == CompletionType.perfected && <PerfectLevelIcon item={item}/>}
              {item.completionType == CompletionType.completed &&  <CompletedLevelIcon item={item}/>}
              {item.completionType == CompletionType.unlocked && <OpenLevelIcon item={item}/>}
              {item.completionType == CompletionType.locked && <LockedLevel item={item}/>}
              <Text style={{color: '#eee', fontWeight: 'bold', marginTop: 10, fontSize: 20}}>'{item.levelName}'</Text>
          </View>
        </TouchableOpacity>
        </View>
      </>
    );
  });
  
  // RenderItem element
  const renderItem = ({ item }) => {
    return (
        <Item 
          item={item} 
        />
    );
  };

  const levelManagerDispatch = useDispatch();
  
  function sameDay(d1, d2) {
    let d1_d = new Date(0)
    d1_d.setUTCMilliseconds(d1);
    let d2_d = new Date(0)
    d2_d.setUTCMilliseconds(d2);
    console.log("redux year")
    console.log(d1_d.getFullYear());
    console.log("redux month")
    console.log(d1_d.getMonth());
    console.log("redux day")
    console.log(d1_d.getDate());
    return d1_d.getFullYear() === d2_d.getFullYear() &&
    d1_d.getMonth() === d2_d.getMonth() &&
    d1_d.getDate() === d2_d.getDate();
  }

  useEffect(() => {
    // calculate whether to give new handout.
    console.log("Same day?")
    console.log(sameDay(levelmanager.last_handout_date, Date.now()));
    if(levelmanager.last_handout_date == undefined || !sameDay(levelmanager.last_handout_date, Date.now()) ){
      console.log(levelmanager.last_handout_date);
      levelManagerDispatch(updateHandoutDate(Date.now()));
      setShowModal(true);
    }
  }, []);


  const flatListRef = useRef<FlatList>();

  let scrollTo = data.findIndex(item=>item.completionType == CompletionType.unlocked);
  scrollTo = (windowHeight * 0.8) / 3 * scrollTo;
  flatListRef?.current?.scrollToOffset({ animated: true, offset:scrollTo });
  const [showModal, setShowModal] = useState(false);

  // Render
  return (
    <>
    <View style={styles.container}>
      <Header />
      <View style={{flex: 1, backgroundColor: "#26303F"}}>
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
          contentContainerStyle={ { paddingTop: (windowHeight * 0.3) / 2.1, paddingBottom: windowHeight / 5 } } 
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
      <View style={ { backgroundColor: '#2B4753', height: windowHeight / 10, width: "100%", flexDirection: "row", alignItems: 'center', justifyContent: 'space-evenly' } }>
        <DifficultyButton onPress={() => {setDifficulty("easy");}} selected={difficulty == "easy"} text="Easy"/>
        <DifficultyButton onPress={() => setDifficulty("normal")} selected={difficulty == "normal"} text="Normal"/>
        <DifficultyButton onPress={() => setDifficulty("hard")} selected={difficulty == "hard"} text="Hard"/>
      </View>
    </View>
    <PrizeModal showModal={showModal} setCloseModal={setShowModal}/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: '#26303F',
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