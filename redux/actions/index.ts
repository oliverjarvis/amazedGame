enum CompletionType{
    locked = "l",
    unlocked = "u",
    completed = "c",
    perfected = "p"
};



export const setLevelProgress = (completionType) => {
    return {
        type: 'SET-LEVEL-PROGRESS',
        payload: {completionType: completionType }
    }
}

export const setActiveLevel = (levelID, levelDifficulty) => {
    console.log(levelDifficulty);
    return {
        type: 'SET-ACTIVE-LEVEL',
        payload: {
            levelID,
            levelDifficulty
        }
    }
}

export const reset = () => {
    return {
        type: 'RESET'
    }
}