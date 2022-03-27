import { createContext } from 'react';

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
            let level_idx = action.payload.level_idx - 1;
            console.log(levelstates);
            let star_increase = 0;
            if(levelstates[level_idx].stars_achieved < action.payload.stars){
                console.log("stars asdfasd");
                star_increase = action.payload.stars - levelstates[level_idx].stars_achieved;
                levelstates[level_idx].stars_achieved = action.payload.stars;
                console.log(star_increase);
            }

            return {
                ...state,
                levels: levelstates,
                total_stars: state.total_stars + star_increase
            };
        default:
            return state;
    }
};

/*export function globalStateInitializer(){

    let level_data: LevelState[] = [];
    data.mazes.forEach((item, index) => {
        level_data.push({
            level_id: item.maze_id,
            stars_achieved: 0,
            unlocked: index == 0 ? true : true,
        });
    });

    console.log(level_data);
    
    return {
        ...initialState,
        levels: level_data,
    }
}*/

export const globalContext = createContext<{
        state: GlobalState,
        dispatch: React.Dispatch<Action>}>
        ({
            state: initialState,
            dispatch: () => undefined
        });
