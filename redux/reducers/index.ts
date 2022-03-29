import levelmanagerReducer from './levelmanager';
import { combineReducers } from 'redux';

const allreducer = combineReducers({
    levelmanager: levelmanagerReducer
})

export default allreducer;

export type RootState = ReturnType<typeof allreducer>
