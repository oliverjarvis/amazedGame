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
    levels: LevelMeta[]
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
    activeLevel: null,
    levels: levelMeta,
}

const levelmanagerReducer = (state = initialGameState, action) => {
    let activeLevel = state.activeLevel;
    let levels = state.levels;
    switch(action.type){
        case 'SET-LEVEL-PROGRESS':
            console.log(state);
            state.levels.forEach((item, index) => {
                //checking both instead of the whole item, in fear of inconsistency caused by different completion types.
                if(item.levelID == state.activeLevel.levelID && item.levelDifficulty == state.activeLevel.levelDifficulty){
                    activeLevel.completionType = action.payload.completionType;
                }
            });
            return {levels, activeLevel: activeLevel};
        case 'SET-ACTIVE-LEVEL':
            console.log(state.activeLevel);
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
            return {levels: state.levels, activeLevel};
        case 'RESET':
            return {...initialGameState};
        default:
            return state;
    }
};

export default levelmanagerReducer  