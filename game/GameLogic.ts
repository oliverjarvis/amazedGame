import { createContext } from 'react';

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
};

type Action = 
    |   { type: 'set-tile'; payload: {tilemode: TileMode, tileIndex: number } }
    |   { type: 'set-level'; payload: number }
    |   { type: 'select-tile'; payload: number }
    |   { type: 'validate-answer'; payload: {tileIndex: number, guess:string} }
    |   { type: 'load_level'; payload: {data: LevelData, level: number, levelDifficulty: string} }
    |   { type: 'game-over'; }
    |   { type: 'skip-word'; };

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
            return {...state, selectedTileIndex: action.payload, tiles: gameTiles, currentWord: state.tiles[action.payload].word};
        case 'validate-answer':
            gameTiles = state.tiles;
            if(state.currentWord.toLowerCase() === action.payload.guess.toLowerCase()){
                if(state.selectedTileIndex >= 0){
                    gameTiles[state.selectedTileIndex].tileMode = 'completed';
                }
                gameTiles = openAdjacentTiles(gameTiles, state.selectedTileIndex);
                let hasWon = state.selectedTileIndex == 15;
                let gameOver = hasWon;
                return {...state, gameOver: gameOver, tiles: gameTiles, hasWon: hasWon, guesses: state.guesses + 1, prevWord: state.currentWord, selectedTileIndex: -1, completed_words: [...state.completed_words, state.currentWord]};
            }
            
            return {...state, tiles: gameTiles, guesses: state.guesses + 1};

        case 'load_level':
            let tiles: TileState[] = [];
            let adjacent_to: number[] = [];
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
        case 'skip-word':
            gameTiles = state.tiles;
            if(state.selectedTileIndex > 0){
                gameTiles[state.selectedTileIndex].tileMode = 'completed';
                gameTiles = openAdjacentTiles(gameTiles, state.selectedTileIndex);
            }
            let hasWon = state.selectedTileIndex == 15;
            let gameOver = hasWon;
            console.log("skipped");
            return {...state, tiles: gameTiles, hasWon: hasWon, gameOver: gameOver};
        default:
            return initialState;
        }
}

/*export function gameStateInitializer(){
    let gameTiles: TileState[] = [];
    let adjacent_to: number[] = [];
    data.maze.forEach((item, index) => {
        let tilemode: TileMode = index == 0 ? 'open' : 'blank';
        let arrows = [];
        if(index == 0){
            adjacent_to = item.adjacent_to;
            arrows = adjacent_to;
        }
        gameTiles.push({tileMode: tilemode, arrowsTo: arrows, tileIndex: index, word: "", adjacent_to: item.adjacent_to, selected: false});
      });
    
    gameTiles.forEach((tile, index) => {
        if(adjacent_to.includes(tile.tileIndex) && tile.tileMode == 'blank'){
            gameTiles[index].tileMode = 'blank';
        }
    });
    return {
        ...initialState,
        currentWord: "",
        prevWord: "",
        tiles: gameTiles
    }
}*/

export const gameManagerContext = createContext<{
                        state: GameState,
                        dispatch: React.Dispatch<Action>}>
                        ({
                            state: initialState,
                            dispatch: () => undefined
                        });
