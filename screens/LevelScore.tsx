import React, { useEffect } from 'react';
import { Alert, View, Text, Pressable, Modal, StyleSheet, FlatList } from 'react-native';
import { useContext } from 'react';
import { globalContext } from '../game/GlobalState';
import { TileState } from '../game/GameLogic';
import { LinearGradient } from 'expo-linear-gradient';
import { gameManagerContext } from '../game/GameLogic';
import LottieView from 'lottie-react-native';

const ConfirmationModal = () => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
    >
      <View>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Hello World!</Text>
        </View>
      </View>
    </Modal>
  )
}

const FailButtons = ({navigation}:{navigation:any}) => {
  const { state, dispatch } = useContext(globalContext);

  return (
    <View style={{flexDirection:"column", width:"80%", alignItems:'center'}}>
      <Pressable style={styles.buttonNext} onPress={() => { navigation.push("GameScreen", {level_id: 1})}}>
        <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center', color:'white'}}>Retry</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => {  navigation.navigate("LevelSelector")}}>
        <Text style={{fontSize: 20, fontWeight:'bold', textAlign:'center', color:"#444"}}>Next</Text>
      </Pressable>
    </View>
  )
}

const SuccessButtons = ({navigation}:{navigation:any}) => {
  const { state, dispatch } = useContext(globalContext);

  return (
    <View style={{flexDirection:"column", width:"80%"}}>
      <Pressable style={styles.button} onPress={() => {navigation.navigate("LevelSelector")}}>
        <Text style={{fontWeight:'bold', textAlign:'center'}}>Next</Text>
      </Pressable>
    </View>
  )
}

const Item = ({ item, backgroundColor, textColor }) => (
  <Pressable style={[styles.item, backgroundColor]}>
    <Text style={{color: textColor, ...styles.itemtext}}>{item.title}</Text>
  </Pressable>
);

const renderItem = ({ item }) => {
  const backgroundColor = "#fffff0";
  const color = '#444';
  
  return (
    <Item
      item={item}
      backgroundColor={{ backgroundColor }}
      textColor={{ color }}
    />
  );
};

const LevelStars = ({levels_completed}: {levels_completed: TileState[]}) => {
  return(<View style={{flexDirection:"row", flexWrap: 'wrap', flex:0, flexBasis: "60%", flexGrow: 0, flexShrink: 0, aspectRatio:1, alignItems:'center'}}>
    {levels_completed.map((item, i) => {
      return (
        <>
        {item.tileMode=="completed" && 
        <View style={{width:'18%', margin:"1%", backgroundColor: "#293D46", borderRadius: 5, aspectRatio:1}} key={i}>
          <Text style={{textAlign:'center', fontSize: 16, fontWeight:'bold', color:'white'}}>{item.tileMode == 'completed'? item.word : ""}</Text>
          <Text style={{textAlign:'center', fontSize: 20}}>{item.tileMode == 'completed'? "💎" : ""}</Text>
        </View>}
        </>
      );
    })}
  </View>);
}

export default function LevelScore({navigation, gameOver, hasWon, completedWords}:{navigation: any, hasWon: boolean, gameOver: boolean, completedWords: TileState[]}) {
  const word_data = completedWords.map((word, index) => { return {title: word, id:index + ""} });
  const { dispatch } = useContext(globalContext);
  const { state } = useContext(gameManagerContext);
  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    if(gameOver){
      dispatch({ type: 'set-level-score', payload: {stars: state.completed_words.length + 1, level_idx: state.level } });
    }
  }, [gameOver])

  return (
    <Modal
        animationType="fade"
        transparent={true}
        visible={gameOver}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setVisible(false);
        }}
      >
        {gameOver &&
         <View style={styles.modalView}>
          <LinearGradient
          // Background Linear Gradient
          start ={{x: 0, y: 0}}
          end = {{x:0, y:1}}
          colors={['#FED392', '#FFFBF5', '#FED392']}
          style={{...styles.background}}>
                <View style={{flexDirection:"column", width:"100%", height: "40%", alignItems:'center', position: 'absolute', top: 0}}>
                  {hasWon ? <LottieView style={{flex: 1}} source={require('./74694-confetti.json')} autoPlay loop/> : <LottieView style={{flex: 1}} source={require('./56450-game-over.json')} autoPlay loop={false}/>}
                </View>
                <View style={{flexDirection:"column", height:"65%", marginBottom: "5%", width: "100%", alignItems:'center'}}>
                  {hasWon && <Text>Level {state.level}</Text>}
                  <LevelStars levels_completed={completedWords}/>
                  <Text style={styles.modalText}>Diamonds Earned</Text>
                  {gameOver ? <FailButtons navigation={navigation}/> : <SuccessButtons navigation={navigation}/>}
                </View>
        </LinearGradient>
        </View>
        }
      </Modal>
  );
}

const styles = StyleSheet.create({
  background:{
    left: 0,
    height: "100%",
    justifyContent:'flex-end',
    right: 0,

  },
  container: {
    justifyContent: 'center',
    backgroundColor: 'red'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  itemtext:{
    fontSize: 30,
    fontWeight: 'bold'
  },
  modalView: {
    margin: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 3
  },
  button: {
    borderRadius: 15,
    textAlign: 'center',
    padding: 16,
    width: "100%",
    margin: "1%",
    backgroundColor: 'transparent',
    borderColor: "#E1566B",
    borderWidth: 2
  },
  buttonNext:{
    backgroundColor: '#E1566B',
    borderRadius: 15,
    textAlign: 'center',
    padding: 16,
    width: "100%",
    margin: "1%",
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: "center"
  },
  item: {
    padding: 10,
    width: "100%",
    borderWidth:2,
    borderColor: '#444',
    borderRadius:6
  },
});