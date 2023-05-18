/* imports */
import { createContext, Dispatch, ReactNode, useState, SetStateAction, useEffect } from "react";


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
interface ContextProviderProps {
    children: ReactNode
}


/* Component */
const CustomContextProvider = ({children}: ContextProviderProps) => {
    const [gold, setGold] = useState<number>(0);
    const [customText, setCustomText] = useState<string>("");
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const CustomContextTwoProps: CustomContextTwoProps = { customText, setCustomText };

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('/api/playerCommonData/gold');
                const responseData = await response.json();

                setGold(responseData.gold);
            } catch (error) {
                console.log('Error adding gold');
            }
        }
        getData();
    }, [])

    /* Renderer */
    return (
        <CustomContext.Provider value={{ PlayerGoldContext, CustomContextTwoProps }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };
