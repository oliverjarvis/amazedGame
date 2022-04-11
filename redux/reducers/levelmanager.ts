import { easylevels } from "../../assets/levels/easy/levels_metadata.js";
import { normallevels } from "../../assets/levels/normal/levels_metadata.js";
import { hardlevels } from "../../assets/levels/hard/levels_metadata.js";

enum CompletionType{
    locked = "l",
    unlocked = "u",
    completed = "c",
    perfected = "p"
};

interface LevelMeta{
    levelID: number;
    levelDifficulty: string;
    levelName: string;
    completionType: CompletionType;
}

interface GameState{
    activeLevel: LevelMeta,
    levels: LevelMeta[],
    skips: number,
    hints: number,
    sfxVolume: number,
    musicVolume: number,
    last_handout_date: number,
}

let levelMeta: LevelMeta[] = 
                    [...new Set([...easylevels, ...normallevels, ...hardlevels])].map((item, index) => 
                        (
                            {   levelID: item.id,
                                levelDifficulty: item.difficulty,
                                levelName: item.title,
                                completionType: item.id == 0 ? CompletionType.unlocked : CompletionType.locked
                            }
                        )
                    );
levelMeta = [...new Set([...levelMeta])];

let initialGameState: GameState = {
    hints: 1,
    activeLevel: null,
    levels: levelMeta,
    skips: 0,
    sfxVolume: 2,
    musicVolume: 2,
    last_handout_date: undefined
}

const levelmanagerReducer = (state = initialGameState, action) => {
    let activeLevel = state.activeLevel;
    let levels = state.levels;
    let musicVolume = state.musicVolume;
    let sfxVolume = state.sfxVolume;
    switch(action.type){
        case 'SET-LEVEL-PROGRESS':
            state.levels.forEach((item, index) => {
                //checking both instead of the whole item, in fear of inconsistency caused by different completion types.
                if(item.levelID == state.activeLevel.levelID && item.levelDifficulty == state.activeLevel.levelDifficulty){
                    activeLevel.completionType = action.payload.completionType;
                }
                if(action.payload.completionType == CompletionType.completed){
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
            return {...state, skips: (state.skips - 1 as number)};
        case 'INCREMENT-HINT':
            return {...state, hints: (state.hints + action.payload as number)};
        case 'SPEND-HINT':
            return {...state, hints: (state.hints - 1 as number)};
        case 'increase-music':
            musicVolume = Math.round(Math.min(state.musicVolume + 1, 5));
            return {...state, musicVolume: musicVolume};
        case 'decrease-music':
            musicVolume = Math.round(Math.max(state.musicVolume - 1, 0));
            return {...state,  musicVolume: musicVolume};
        case 'increase-sfx':
            sfxVolume = Math.round(Math.min(state.sfxVolume + 1, 5));
            return {...state,  sfxVolume: sfxVolume};
        case 'decrease-sfx':
            sfxVolume = Math.round(Math.max(state.sfxVolume - 1, 0));
            return {...state,  sfxVolume: sfxVolume};
        case 'RESET':
            return {...initialGameState};
        case 'update-handout-date':
            console.log(state.skips);
            return {...state, last_handout_date: action.payload, skips: (state.skips + 2 as number)};
        default:
            return state;
    }
};

export default levelmanagerReducer  