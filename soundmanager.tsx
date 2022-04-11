import { createContext, useEffect, useState } from "react";
import {Audio} from "expo-av";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/reducers";
import { decreaseMusic, decreaseSFX, increaseMusic, increaseSFX } from "./redux/actions";
export const SoundManagerContext = createContext<Audio.Sound>( null );

export const changeVolume  = async (sound: Audio.Sound, volume) => {
    await sound.setVolumeAsync(volume);
}

const soundObject = new Audio.Sound();
const failObject = new Audio.Sound();
const successObject = new Audio.Sound();
const winClick = new Audio.Sound();
const buttonClickObject = new Audio.Sound();

export async function changeMusicVolAsync(volume, direction){
    let vol = volume;
    if(direction == "down"){
        vol = (vol - 1) / 5.0;
    }else{
        vol = (vol + 1) / 5.0;
    }

    vol = Math.min(Math.max(vol, 0), 1);
    console.log(vol);
    await soundObject.setVolumeAsync(vol);
}

export async function muteunmute(volume, direction){
    let vol = volume;
    if(direction == "down"){
        vol = (vol - 1) / 5.0;
    }else{
        vol = (vol + 1) / 5.0;
    }

    vol = Math.min(Math.max(vol, 0), 1);
    console.log(vol);
    await soundObject.setVolumeAsync(vol);
}

export async function changeSFXVolAsync(volume, direction){
        let vol = volume;
        if(direction == "down"){
            vol = (vol - 1) / 5.0;
        }else{
            vol = (vol + 1) / 5.0;
        }
        vol = Math.min(Math.max(vol, 0), 1);
        await buttonClickObject.setVolumeAsync(vol);
        await failObject.setVolumeAsync(vol);
        await successObject.setVolumeAsync(vol);
}

export function playError(){
    failObject.playAsync();
}

export async function playButtonClick(){
    await buttonClickObject.replayAsync();
}

export async function playSucessClick(){
    await successObject.replayAsync();
}

export async function playFailClick(){
    await failObject.replayAsync();
}

export default function SoundManagerProvider(props: any){
    const [playing, setPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    const levelmanager = useSelector((state: RootState) => state.levelmanager);
    
    useEffect(() => {
        const getSound = async () => {
            await Audio.setIsEnabledAsync(true);
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                allowsRecordingIOS: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                shouldDuckAndroid: false,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
              });
            await soundObject.loadAsync(require('./assets/audio/happy.mp3'));
            await soundObject.setVolumeAsync(levelmanager.musicVolume / 5.0);

            await buttonClickObject.loadAsync(require('./assets/audio/buttonclick.mp3'));
            //await buttonClickObject.setVolumeAsync(levelmanager.sfxVolume);

            await failObject.loadAsync(require('./assets/audio/fail.wav'));
            //await failObject.setVolumeAsync(levelmanager.sfxVolume);

            await successObject.loadAsync(require('./assets/audio/correct.mp3'));
            //await successObject.setVolumeAsync(levelmanager.sfxVolume);

            await winClick.loadAsync(require('./assets/audio/winclick.mp3'));
            //await winClick.setVolumeAsync(levelmanager.sfxVolume);

        }

        const playSound = async(sound) => {
            soundObject.playAsync();
        }
    
        getSound().then((item)=> {
            playSound(item);
        });
    }, []);
    

    return (
        <SoundManagerContext.Provider value={sound}>
            {props.children}
        </SoundManagerContext.Provider>  
    );
}


/*import { Audio } from 'expo-av';

const soundClip = {sound:null}

export async function startMusicAsync(){
    if(soundClip.sound == null){
        console.log(soundClip);
        let {sound} = await Audio.Sound.createAsync(require('./assets/audio/Cottages.mp3'));
        soundClip.sound = sound
        Object.freeze(soundClip);
        await soundClip.sound.playAsync();
    }
}



/*async function changeMusicVolAsync(sound, volume){
    console.log(sound);
    await sound.setVolumeAsync(volume);
}

const soundmanagerReducer = (state = initialSoundState, action) => {
    let musicVolume = state.musicVolume;
    switch(action.type){
        case 'start-music':
            console.log("asdfs");
            startMusicAsync(action.payload);
            return {...state, musicTrack: action.payload};
        case 'increase-music':
            console.log(state);
            musicVolume = Math.min(state.musicVolume + 0.2, 1.0);
            changeMusicVolAsync(state.musicTrack, action.volume);
            console.log(state.musicTrack);
            return {...state, musicVolume: musicVolume};
        case 'decrease-music':
            musicVolume = Math.max(state.musicVolume - 0.2, 0.0);
            console.log(musicVolume);
            changeMusicVolAsync(state.musicTrack, action.volume);
            return {...state,  musicVolume: musicVolume};
        case 'increase-sfx':
            return state;
        case 'decrease-sfx':
            return state;
        default:
            return state;
    }
};

export default soundmanagerReducer  */