import { useReducer, useEffect } from "react";
import { gameReducer, gameManagerContext, initialState} from "../GameLogic";
import { levels } from "../../assets/levels/easy/levels_metadata";

interface LevelData
{
    maze: {
        word: string,
        adjacent_to: number[],
    }[]
}

export default function LevelProvider(props: any){

    useEffect(() => {
        const levelname = "level" + props.levelid;
        const data: LevelData = levels.levels[levelname];
        data && dispatch({type: "load_level", payload: {data: data, level: props.levelid}});
      }, []);

    const [state, dispatch] = useReducer(gameReducer, initialState);
    
    return (
        <gameManagerContext.Provider value={ {state, dispatch} }>
            {props.children}
        </gameManagerContext.Provider> 
    );
}

