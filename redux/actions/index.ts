import { Audio } from 'expo-av';

enum CompletionType{
    locked = "l",
    unlocked = "u",
    completed = "c",
    perfected = "p"
};


export const increaseMusicVol = () => {
    return {
        type: 'increase-music'
    }
}

export const decreaseMusicVol = () => {
    return {
        type: 'decrease-music'
    }
}

export const setLevelProgress = (completionType) => {
    return {
        type: 'SET-LEVEL-PROGRESS',
        payload: {completionType: completionType }
    }
}

export const setActiveLevel = (levelID, levelDifficulty) => {
    return {
        type: 'SET-ACTIVE-LEVEL',
        payload: {
            levelID,
            levelDifficulty
        }
    }
}

export const incrementSkip = () => {
    return {
        type: 'INCREMENT-SKIPS',
        payload: 2,
    }
}

export const spendSkip = () => {
    return {
        type: 'SPEND-SKIP',
        payload: 1,
    }
}

export const incrementHint = () => {
    return {
        type: "INCREMENT-SKIP",
        payload: 1,
    }
}

export const spendHint = () => {
    return {
        type: 'SPEND-HINT',
        payload: 1,
    }
}

export const increaseMusic = () => {
    return {
        type: 'increase-music'
    }
}
export const decreaseMusic = () => {
    return {
        type: 'decrease-music'
    }
}
export const increaseSFX = () => {
    return {
        type: 'increase-sfx'
        }
}
export const decreaseSFX = () => {
    return {
        type: 'decrease-sfx'
    }
}
export const reset = () => {
    return {
        type: 'RESET'
    }
}

export const updateHandoutDate = (date: number) => {
    return {
        type: 'update-handout-date',
        payload: date
    }
}