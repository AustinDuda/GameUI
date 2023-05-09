/* imports */
import { PLAYERDATATYPES } from "@/configs/enums";
import useApiGet from "@/hooks/useApiGet";
import useApiPost from "@/hooks/useApiPost";
import { createContext, Dispatch, ReactNode, useState, SetStateAction, useContext, useEffect, useRef } from "react";


/* Player Gold state */
interface PlayerGoldContext {
    gold: number;
    setGold: Dispatch<SetStateAction<number>>
}

const initialPlayerGold: PlayerGoldContext = {
    gold: 1,
    setGold: () => {},
};


/* Empty State */
interface CustomContextTwoProps {
    customText: string;
    setCustomText: Dispatch<SetStateAction<string>>
}

const initialStateTwo: CustomContextTwoProps = {
    customText: "",
    setCustomText: () => {},
};


/* Setting state prop types */
type ContextProps = {
    PlayerGoldContext: PlayerGoldContext;
    CustomContextTwoProps: CustomContextTwoProps;
};


/* Creating context */
const CustomContext = createContext<ContextProps>({
    PlayerGoldContext: initialPlayerGold,
    CustomContextTwoProps: initialStateTwo,
});


/* Setting children types for context provider */
interface CustomContextProviderProps {
    children: ReactNode
}


/* Component */
const CustomContextProvider = ({children}: CustomContextProviderProps) => {
    const { postData } = useApiPost('/api/playerData');
    const { getData } = useApiGet('/api/playerData', PLAYERDATATYPES.gold);

    const prevGold = useRef<number>(0);
    const [gold, setGold] = useState<number>(0);
    const [customText, setCustomText] = useState<string>("");
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const CustomContextTwoProps: CustomContextTwoProps = { customText, setCustomText };
    
    
    /* */
    useEffect(() => {
        if (getData === null) return;
        prevGold.current = getData;
        setGold(getData);
    }, [getData]);


    /* */
    useEffect(() => {
        if (gold != prevGold.current) {
            postData(gold - prevGold.current, PLAYERDATATYPES.gold);
            prevGold.current = gold;
        }
    }, [gold])


    /* Renderer */
    return (
        <CustomContext.Provider value={{ PlayerGoldContext, CustomContextTwoProps }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };