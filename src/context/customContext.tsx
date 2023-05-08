import { createContext, Dispatch, ReactNode, useState, SetStateAction } from "react";

interface CustomContextProps {
    customNumber: number;
    setCustomNumber: Dispatch<SetStateAction<number>>
}

interface CustomContextProviderProps {
    children: ReactNode
}

const CustomContext = createContext<CustomContextProps>({
    customNumber: 0, 
    setCustomNumber: () => {}
});

const CustomContextProvider = ({children}: CustomContextProviderProps) => {
    const [customNumber, setCustomNumber] = useState(0);

    return (
        <CustomContext.Provider value={{customNumber, setCustomNumber}}>
            {children}
        </CustomContext.Provider>
    )
}

export {CustomContext, CustomContextProvider};