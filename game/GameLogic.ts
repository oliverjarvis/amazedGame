import { createContext } from 'react';
import { playFailClick, playSucessClick } from "../soundmanager";

interface LevelData
{
    maze: {
        word: string,
        adjacent_to: number[],
    }[]
}

type TileMode = 'blank' | 'open' | 'completed' | 'selected';
type ArrowState = 'up' | 'down' | 'left' | 'right' | 'none';

export type TileState = {
    tileIndex: number,
    tileMode: TileMode,
    adjacent_to: number[],
    selected: boolean,
    arrowsTo: number[],
    word: string,
}

type GameState = {
    tiles: TileState[],
    arrows: ArrowState[],
    level: number,
    levelDifficulty: string,
    hasWon: boolean,
    currentWord: string,
    selectedTileIndex: number,
    guesses: number,
    gameOver: boolean,
    prevWord: string,
    completed_words: string[],
    showWin: boolean,
    isPaused: boolean,
    completedWordCount: number,
    showScoreModal: boolean,
  };

export const initialState: GameState = {
    tiles: [],
    arrows: [],
    level: -1,
    levelDifficulty: "",
    hasWon: false,
    gameOver: false,
    selectedTileIndex: -1,
    currentWord: "",
    prevWord: "",
    guesses: 0,
    completed_words: [],
    completedWordCount: 0,
    isPaused: false,
    showWin: false,
    showScoreModal: false
};

type Action = 
    |   { type: 'set-tile'; payload: {tilemode: TileMode, tileIndex: number } }
    |   { type: 'set-level'; payload: number }
    |   { type: 'select-tile'; payload: number }
    |   { type: 'validate-answer'; payload: {tileIndex: number, guess:string} }
    |   { type: 'load_level'; payload: {data: LevelData, level: number, levelDifficulty: string} }
    |   { type: 'reload_level'; }
    |   { type: 'game-over'; }
    |   { type: 'skip-word'; }
    | { type: 'show-score-modal'; }
    |   { type: "pause-unpause"; }
    | { type: 'show-win'; }
    |   { type: 'clear-text'; };

const openAdjacentTiles = (tiles: TileState[], index: number): TileState[] =>{
    tiles[index].adjacent_to.forEach((item, i) => {
        if(tiles[item].tileMode == 'blank'){
            tiles[item].tileMode = 'open';
            tiles[index].arrowsTo.push(item);
        }
    });
    return tiles;
}
    
export const gameReducer = (state: GameState, action: Action): GameState =>{
    let gameTiles: TileState[] = state.tiles;
    let adjacent_to: number[] = [];
    let currentWord = state.currentWord;
    if(gameTiles.length > 0){
        currentWord = state.currentWord.length > 0 ? state.currentWord : gameTiles[0].word;
    }
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
            return {...state, selectedTileIndex: action.payload, tiles: gameTiles, prevWord: currentWord, currentWord: state.tiles[action.payload].word};
        case 'validate-answer':
            gameTiles = state.tiles;
            if(state.currentWord.toLowerCase() === action.payload.guess.toLowerCase()){
                if(state.selectedTileIndex >= 0){
                    gameTiles[state.selectedTileIndex].tileMode = 'completed';
                }
                gameTiles = openAdjacentTiles(gameTiles, state.selectedTileIndex);
                let hasWon = state.selectedTileIndex == 15;
                let gameOver = hasWon;
                console.log("hasWon");
                console.log(hasWon);
                playSucessClick();
                return {...state, gameOver: gameOver, tiles: gameTiles, hasWon: hasWon, showScoreModal: hasWon, guesses: state.guesses, selectedTileIndex: -1,  completed_words: [...state.completed_words, state.currentWord], completedWordCount: state.completedWordCount + 1};
            }
            playFailClick();
            return {...state, tiles: gameTiles, guesses: state.guesses + 1};

        case 'load_level':
            let tiles: TileState[] = [];
            action.payload.data.maze.forEach((item, index) => {
                let arrows = [];
                let tilemode: TileMode = index == 0 ? 'completed' : 'blank';
                if(index == 0){
                    adjacent_to = item.adjacent_to;
                    arrows = adjacent_to;
                }
                tiles.push({tileMode: tilemode, arrowsTo: arrows, tileIndex: index, word: item.word, adjacent_to: item.adjacent_to, selected: false});
            }); 
            tiles.forEach((tile, index) => {
                if(adjacent_to.includes(tile.tileIndex) && tile.tileMode == 'blank'){
                    tiles[index].tileMode = 'open';
                }
            });
            return { ...state, tiles: tiles, level: action.payload.level, levelDifficulty: action.payload.levelDifficulty };
        case 'game-over':
            return {...state, gameOver: true};
        case 'show-score-modal':
            return {...state, showScoreModal: true};
        case 'show-win':
            return {...state, showWin: true};
        case 'pause-unpause':
            return {...state, isPaused: !state.isPaused};
        case 'skip-word':
            gameTiles = state.tiles;
            if(state.selectedTileIndex > 0){
                gameTiles[state.selectedTileIndex].tileMode = 'completed';
                gameTiles = openAdjacentTiles(gameTiles, state.selectedTileIndex);
            }
            playSucessClick();
            let hasWon = state.selectedTileIndex == 15;
            let gameOver = hasWon;
            console.log("has won skip");
            console.log(gameOver);
            return {...state, tiles: gameTiles, hasWon: hasWon, gameOver: gameOver, selectedTileIndex: -1};
        }
}

export const gameManagerContext = createContext<{
                        state: GameState,
                        dispatch: React.Dispatch<Action>}>
                        ({
                            state: initialState,
                            dispatch: () => undefined
                        });

/*
case 'reload_level':
            let newtiles: TileState[] = [];
            gameTiles.forEach((item, index) => {
                let arrows = [];
                let tilemode: TileMode = index == 0 ? 'completed' : 'blank';
                if(index==0) {
                    adjacent_to = item.adjacent_to;
                    arrows = adjacent_to;
                }
                newtiles.push({tileMode: tilemode, arrowsTo: arrows, tileIndex: index, word: item.word, adjacent_to: item.adjacent_to, selected: false});
            });
            newtiles.forEach((tile, index) => {
                if(adjacent_to.includes(tile.tileIndex) && tile.tileMode == 'blank'){
                    newtiles[index].tileMode = 'open';
                }
            });

            return {...initialState, tiles: newtiles, level: state.level, levelDifficulty: state.levelDifficulty};
            */