//import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducer from "./redux/reducers/";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'
import { Component, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { enableScreens } from 'react-native-screens';

import thunk from 'redux-thunk'
import SoundManagerProvider from './soundmanager';
import TrackPlayer, { Capability } from 'react-native-track-player';

import { Audio } from "expo-av";

enableScreens();

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, allReducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store)



export default function App() { 
  const [appIsReady, setAppIsReady] = useState(false);

  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const backgroundMusic = new Audio.Sound();

  /*async function playMusic(){
    try{
      await backgroundMusic.loadAsync(require("./assets/audio/happy.mp3"));
      await backgroundMusic.setIsLoopingAsync(true);
      await backgroundMusic.playAsync();


    }catch(e){
      console.log("music stopped");
    }
  }

  useLayoutEffect(() => {
    playMusic();
  }, []);*/
  
  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!appIsReady || !isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <SoundManagerProvider>
          <Navigation colorScheme={colorScheme}/>
        </SoundManagerProvider>
      </PersistGate>
    </Provider>
  );

}
