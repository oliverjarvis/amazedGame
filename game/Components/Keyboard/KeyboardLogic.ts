import { createContext } from 'react';

type KeyboardState = {
    letter: string,
    occurences: number,
}

type Action = {
    type: string,
    payload: string,
}

interface keyboardInterface{
    letter: string;
    letter_occurences: number;
}

export const keyboardReducer = (state: KeyboardState, action: Action): KeyboardState => {
    switch (action.type) {
        case 'set-letter':
            if (state.letter == action.payload) {
                return {
                    letter: action.payload,
                    occurences: state.occurences + 1
                }
            }
            else return {
                letter: action.payload,
                occurences: 1
            };
        default:
            return state;
    }
}

export const keyboardContext = createContext<{
    keyboardstate: KeyboardState,
    keyboarddispatch: React.Dispatch<any>}>
    ({
        keyboardstate: {letter:'', occurences:0},
        keyboarddispatch: () => undefined
    });

export default keyboardReducer;