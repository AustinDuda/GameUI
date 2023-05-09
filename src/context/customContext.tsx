import { createContext, Dispatch, ReactNode, useState, SetStateAction, useContext } from "react";

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
    const [gold, setGold] = useState<number>(1);
    const [customText, setCustomText] = useState<string>("");
    
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const CustomContextTwoProps: CustomContextTwoProps = { customText, setCustomText };

    
    /* Renderer */
    return (
        <CustomContext.Provider value={{ PlayerGoldContext, CustomContextTwoProps }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };