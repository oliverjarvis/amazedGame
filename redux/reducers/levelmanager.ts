import { easylevels } from "../../assets/levels/easy/levels_metadata";
import { normallevels } from "../../assets/levels/normal/levels_metadata";
import { hardlevels } from "../../assets/levels/hard/levels_metadata";

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
                if(action.payload.completionType == CompletionType.completed){
                    console.log(item.levelID);
                    console.log(state.activeLevel.levelID + 1);
                }
                if(item.levelID == state.activeLevel.levelID + 1 && (action.payload.completionType == CompletionType.completed || action.payload.completionType == CompletionType.perfected)){
                    if(item.levelDifficulty == state.activeLevel.levelDifficulty){
                        levels[index].completionType =  levels[index].completionType == CompletionType.locked? CompletionType.unlocked: levels[index].completionType;
                    }
                }
            });
            return {...state, levels, activeLevel: activeLevel};
        case 'SET-ACTIVE-LEVEL':
            state.levels.forEach((item, index) => {
                if(item.levelDifficulty == action.payload.levelDifficulty){
                    if(item.levelID == action.payload.levelID){
                        activeLevel = item;
                    }
                }
            });
            return {...state, activeLevel};
        case 'INCREMENT-SKIPS':
            return {...state, skips: (state.skips + action.payload as number)};
        case 'SPEND-SKIP':
            console.log("hello");
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