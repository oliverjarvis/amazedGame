import { createContext, useContext } from 'react';
const data: LevelData = require('../assets/leveldata/data.json');

interface LevelData
{
    maze: {
        word: string,
        adjacent_to: number[],
    }[]
}

import Tile from '../components/Tile';

type TileMode = 'blank' | 'open' | 'completed' | 'selected';

export type TileState = {
    tileIndex: number,
    tileMode: TileMode,
    adjacent_to: number[],
    selected: boolean,
    word: string,
}

type GameState = {
    tiles: TileState[],
    level: number,
    hasWon: boolean,
    currentWord: string,
    selectedTileIndex: number
  };

export const initialState: GameState = {
    tiles: [],
    level: 1,
    hasWon: false,
    selectedTileIndex: -1,
    currentWord: "hole"
};

type Action = 
    |   { type: 'set-tile'; payload: {tilemode: TileMode, tileIndex: number } }
    |   { type: 'set-level'; payload: number }
    |   { type: 'select-tile'; payload: number }
    |   { type: 'validate-answer'; payload: {tileIndex: number, guess:string} }


const openAdjacentTiles = (tiles: TileState[], index: number): TileState[] =>{
    tiles[index].adjacent_to.forEach((item) => {
        if(tiles[item].tileMode == 'blank'){
            tiles[item].tileMode = 'open';
        }
    });
    return tiles;
}
    
export const gameReducer = (state: GameState, action: Action): GameState =>{
    let gameTiles: TileState[] = state.tiles;

    switch (action.type) {
        case 'select-tile':
            gameTiles = state.tiles;
            gameTiles.forEach((tile, index) => {
                gameTiles[index].selected = false;
                if(tile.tileIndex == action.payload){
                    if(gameTiles[index].tileMode == 'open'){
                        gameTiles[index].selected = true;
                    }
                }
                });
            console.log(gameTiles);
            return {...state, selectedTileIndex: action.payload, tiles: gameTiles, currentWord: state.tiles[action.payload].word};
        case 'validate-answer':
            console.log(action.payload.guess);
            gameTiles = state.tiles;
            
            if(state.currentWord.toLowerCase() === action.payload.guess.toLowerCase()){
                if(state.selectedTileIndex >= 0){
                    gameTiles[state.selectedTileIndex].tileMode = 'completed';
                }
                gameTiles = openAdjacentTiles(gameTiles, state.selectedTileIndex);
                return {...state, tiles: gameTiles, hasWon: true};
            }
            return {...state, tiles: gameTiles};
        case 'set-level':
            return { ...state, level: action.payload };
        default:
            return initialState;
        }
}

export function gameStateInitializer(){
    let gameTiles: TileState[] = [];
    let adjacent_to: number[] = [];
    data.maze.forEach((item, index) => {
        let tilemode: TileMode = index == 0 ? 'completed' : 'blank';
        if(index == 0){
            adjacent_to = item.adjacent_to;
        }
        gameTiles.push({tileMode: tilemode, tileIndex: index, word: item.word, adjacent_to: item.adjacent_to, selected: false});
      });
    
    gameTiles.forEach((tile, index) => {
        if(adjacent_to.includes(tile.tileIndex) && tile.tileMode == 'blank'){
            gameTiles[index].tileMode = 'open';
        }
    });
    return {
        ...initialState,
        tiles: gameTiles
    }
}

export const gameManagerContext = createContext<{
                        state: GameState,
                        dispatch: React.Dispatch<Action>}>
                        ({
                            state: initialState,
                            dispatch: () => undefined
                        });
