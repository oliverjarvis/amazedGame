import * as SplashScreen from 'expo-splash-screen';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useState, useReducer, useContext } from 'react';
import Game from '../game/Game';
import { LinearGradient } from 'expo-linear-gradient';
import LevelProvider from '../game/Providers/LevelProvider';


export default function GameScreen({ route, navigation }) {
  const { levelID, levelDifficulty } = route.params;
  return (
    <View style={{...styles.window}}>
      <LinearGradient
        // Background Linear Gradient
        start ={{x: 0, y: 0}}
        end = {{x:1, y:1}}
        colors={['#26303F', '#26303F', '#26303F']}
        style={{...styles.background}}>
          <LevelProvider levelID={levelID} levelDifficulty={levelDifficulty}>
            <Game navigation={navigation} />
          </LevelProvider>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  input:{
    height: 100,
    fontSize: 50
  },
  background:{
    position: 'absolute',
    left: 0,
    height: "100%",
    right: 0,
  },
  window: {
    backgroundColor:'#766F73',
    height: "100%",
    flexDirection: 'column',
    justifyContent: 'space-between' 
  }
});