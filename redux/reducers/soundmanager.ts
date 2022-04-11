import { Audio } from 'expo-av';
import {useEffect, useState} from "react";


interface SoundState{
    musicVolume: number;
    sfxVolume: number;
}

let initialSoundState: SoundState = {
    musicVolume: 1,
    sfxVolume: 1,
}

const soundmanagerReducer = (state = initialSoundState, action) => {
    let musicVolume = state.musicVolume;
    switch(action.type){
        case 'increase-music':
            musicVolume = Math.min(state.musicVolume + 0.2, 1.0);
            return {...state, musicVolume: musicVolume};
        case 'decrease-music':
            musicVolume = Math.max(state.musicVolume - 0.2, 0.0);
            return {...state,  musicVolume: musicVolume};
        case 'increase-sfx':
            return state;
        case 'decrease-sfx':
            return state;
        default:
            return state;
    }
};

export default soundmanagerReducer  