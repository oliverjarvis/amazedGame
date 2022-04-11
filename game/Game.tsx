import React, { useContext, useEffect, useReducer, useState } from 'react';
import { gameManagerContext} from "./GameLogic";
import BoardView from './Components/TileBoard/TileBoard';
import ActionBoard from './Components/ActionBoard';
import InputTiles from './Components/InputTiles';
import KeyboardInput from './Components/Keyboard/Keyboard';
import {keyboardContext, keyboardReducer} from './Components/Keyboard/KeyboardLogic';
import LevelScore from './Components/Modals/LevelScoreModal'
import { Header } from './Components/Header';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
  setTestDeviceIDAsync,
} from 'expo-ads-admob';
import { useSelector } from "react-redux";
import SettingsModal from './Components/Modals/SettingsModal';
import InGameSettingsModal from './Components/Modals/InGameSettingsModal';

const Game = ({navigation}:{navigation:any}) => {

    const [keyboardstate, keyboarddispatch] = useReducer(keyboardReducer, {letter: "", occurences: 0});       
    const [settingsPressed, setSettingsPressed] = useState(false);

    const {state} = useContext(gameManagerContext);
  
    
    return (
        <>
          <Header level_id={state.level} setSettingsPressed={setSettingsPressed}/>
          <ActionBoard/>
          <BoardView/>
          <keyboardContext.Provider value={ {keyboardstate, keyboarddispatch} }>
            <InputTiles/>
            <KeyboardInput/>
          </keyboardContext.Provider>
          <InGameSettingsModal showModal={settingsPressed} setCloseModal={setSettingsPressed}/>
         <LevelScore navigation={navigation} completedWords={state.tiles} hasWon={state.hasWon} gameOver={state.gameOver}/>
        </>
      );
}

export default Game;

