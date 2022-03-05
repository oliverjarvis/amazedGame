import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useReducer, useContext } from 'react';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {StatusBar, TextInput} from 'react-native';
import Game from '../game/Game';

export default function GameScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false});
  }, [navigation]);

  const [wordGuess, setWordGuess] = useState("");

  return (
    <View style={styles.window}>
      <Game />
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    height: 100,
    fontSize: 50
  },
  actionboard:{
    backgroundColor:'#F7EDED',
    flex: 1,
    flexDirection: 'column',
    borderRadius: 15,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    padding: 20,
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center' 
  },
  window: {
    backgroundColor:'#E8F6F6',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between' 
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    marginLeft:30,
    marginRight:30,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button:{
    backgroundColor: '#fff',
    width: '95%',
    aspectRatio: 1,
    borderRadius: 4,
  },
  buttonText:{
    height: '100%',
    width: '100%',
    padding: 6,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#444'
  },
  logo: {width: 302, height:  90}
});
