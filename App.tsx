//import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { globalStateReducer, globalContext, initialState, globalStateInitializer} from "./game/GlobalState";
import { useReducer } from 'react';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  const [state, dispatch] = useReducer(globalStateReducer, initialState, globalStateInitializer);
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        <globalContext.Provider value={ {state, dispatch} }>
          <Navigation colorScheme={colorScheme} />
        </globalContext.Provider>
    );
  }
}
