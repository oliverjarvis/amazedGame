import { createContext, useContext } from 'react';
const data: LevelData = require('../assets/leveldata/leveldata.json');

interface LevelData
{
    mazes:{
        maze_id: number,
        maze: {
            word: string,
            adjacent_to: number[],
        }[]
    }[]
}

type LevelState = {
    level_id: number,
    stars_achieved: number,
    unlocked: boolean,
}

type GlobalState = {
    levels: LevelState[],
    total_stars: number,
  };

export const initialState: GlobalState = {
    levels: [],
    total_stars: 0,
};

type Action = 
    |   { type: 'update-total-stars'; payload: number }
    |   { type: 'set-level-score'; payload: {level_idx: number, stars: number }}


export const globalStateReducer = (state: GlobalState, action: Action): GlobalState =>{

    switch (action.type) {
        case 'update-total-stars':
            return {
                ...state,
                total_stars: state.total_stars + action.payload,
            };
        case 'set-level-score':

            let levelstates: LevelState[] = state.levels;
            let star_increase = 0;
            if(levelstates[action.payload.level_idx].stars_achieved < action.payload.stars){
                levelstates[action.payload.level_idx].stars_achieved = action.payload.stars;
                star_increase = action.payload.stars - levelstates[action.payload.level_idx].stars_achieved;
            }

            return {
                ...state,
                levels: levelstates,
                total_stars: state.total_stars + 100
            };
        default:
            return state;
    }
};

export function globalStateInitializer(){

    let level_data: LevelState[] = [];
    data.mazes.forEach((item, index) => {
        level_data.push({
            level_id: item.maze_id,
            stars_achieved: 0,
            unlocked: index == 0 ? true : false,
        });
    });
    
    return {
        ...initialState,
        levels: level_data,
    }
}

export const globalContext = createContext<{
        state: GlobalState,
        dispatch: React.Dispatch<Action>}>
        ({
            state: initialState,
            dispatch: () => undefined
        });
