import levelmanagerReducer from './levelmanager';
import soundmanagerReducer from './soundmanager';
import { combineReducers } from 'redux';

const allreducer = combineReducers({
    levelmanager: levelmanagerReducer,
    soundmanager: soundmanagerReducer,
})

export default allreducer;

export type RootState = ReturnType<typeof allreducer>
