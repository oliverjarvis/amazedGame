import { easylevels } from "../../assets/levels/easy/levels_metadata";
import { normallevels } from "../../assets/levels/normal/levels_metadata";
import { hardlevels } from "../../assets/levels/hard/levels_metadata";

import { LevelMetadata } from "../../assets/levels/interfaces";

enum CompletionType{
    locked = "l",
    unlocked = "u",
    completed = "c",
    perfected = "p"
};

interface LevelMeta{
    levelID: number;
    levelDifficulty: string;
    completionType: CompletionType
}

interface GameState{
    activeLevel: LevelMeta,
    levels: LevelMeta[],
    skips: number,
    hints: number
}

let levelMeta: LevelMeta[] = 
                    [...new Set([...easylevels, ...normallevels, ...hardlevels])].map((item, index) => 
                        (
                            {   levelID: item.id,
                                levelDifficulty: item.difficulty,
                                completionType: item.id == 0 ? CompletionType.unlocked : CompletionType.locked
                            }
                        )
                    );
levelMeta = [...new Set([...levelMeta])];

let initialGameState: GameState = {
    hints: 1,
    activeLevel: null,
    levels: levelMeta,
    skips: 1,
}

const levelmanagerReducer = (state = initialGameState, action) => {
    let activeLevel = state.activeLevel;
    let levels = state.levels;
    switch(action.type){
        case 'SET-LEVEL-PROGRESS':
            state.levels.forEach((item, index) => {
                //checking both instead of the whole item, in fear of inconsistency caused by different completion types.
                if(item.levelID == state.activeLevel.levelID && item.levelDifficulty == state.activeLevel.levelDifficulty){
                    activeLevel.completionType = action.payload.completionType;
                }
            });
            return {...state, levels, activeLevel: activeLevel};
        case 'SET-ACTIVE-LEVEL':
            state.levels.forEach((item, index) => {
                if(item.levelDifficulty == action.payload.levelDifficulty){
                    if(item.levelID == action.payload.levelID){
                        activeLevel = item;
                    }
                    if(item.levelID == action.payload.levelID + 1){
                        levels[index].completionType = CompletionType.unlocked;
                    }
                }
                
            });
            return {...state, activeLevel};
        case 'INCREMENT-SKIPS':
            console.log(action.payload);
            return {...state, skips: (state.skips + action.payload as number)};
        case 'SPEND-SKIP':
            return {...state, skips: (state.skips - 1 as number)};
        case 'INCREMENT-HINT':
            return {...state, hints: (state.hints + action.payload as number)};
        case 'SPEND-HINT':
            return {...state, hints: (state.hints - 1 as number)};
        case 'RESET':
            return {...initialGameState};
        default:
            return state;
    }
};

export default levelmanagerReducer  