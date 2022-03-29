import React, { useContext, useReducer } from 'react';
import { gameManagerContext} from "./GameLogic";
import BoardView from './Components/TileBoard';
import ActionBoard from './Components/ActionBoard';
import InputTiles from './Components/InputTiles';
import KeyboardInput from './Components/Keyboard/Keyboard';
import {keyboardContext, keyboardReducer} from './Components/Keyboard/KeyboardLogic';
import LevelScore from '../screens/LevelScore';
import { Header } from './Components/Header';

import { useSelector } from "react-redux";

const Game = ({navigation}:{navigation:any}) => {

    const {state} = useContext(gameManagerContext);
    const [keyboardstate, keyboarddispatch] = useReducer(keyboardReducer, {letter: "", occurences: 0});       

    return (
        <>
          <Header level_id={state.level}/>
          <ActionBoard/>
          <BoardView/>
          <keyboardContext.Provider value={ {keyboardstate, keyboarddispatch} }>
            <InputTiles/>
            <KeyboardInput/>
          </keyboardContext.Provider>
          <LevelScore navigation={navigation} completedWords={state.tiles} hasWon={state.hasWon} gameOver={state.gameOver}/>
        </>
      );
}

export default Game;

