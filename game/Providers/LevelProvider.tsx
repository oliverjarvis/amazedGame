import { useReducer, useEffect } from "react";
import { gameReducer, gameManagerContext, initialState} from "../GameLogic";
import { easylevels } from "../../assets/levels/easy/levels_metadata";
import { normallevels } from "../../assets/levels/normal/levels_metadata";
import { hardlevels } from "../../assets/levels/hard/levels_metadata";
import { LevelData } from "../../assets/levels/interfaces";


export default function LevelProvider(props: any){

    useEffect(() => {
        let level_dat: LevelData = null;
        switch(props.levelDifficulty){
            case 'easy':
                level_dat = easylevels[props.levelID].data;
                break;
            case 'normal':
                level_dat = normallevels[props.levelID].data;
                break;
            case 'hard':
                level_dat = hardlevels[props.levelID].data;
        }

        level_dat && dispatch({type: "load_level", payload: {data: level_dat, level: props.levelid, levelDifficulty: props.levelDifficulty}});
      }, []);

      
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return (
        <gameManagerContext.Provider value={ {state, dispatch} }>
            {props.children}
        </gameManagerContext.Provider> 
    );
}

