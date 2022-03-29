//import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import allReducer from "./redux/reducers/";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, allReducer)

const store = createStore(persistedReducer);
const persistor = persistStore(store)

export default function App() { 
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
     
  if (!isLoadingComplete) {   
    return null;
  } else {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navigation colorScheme={colorScheme} />
        </PersistGate>
      </Provider>
    );
  }
}
