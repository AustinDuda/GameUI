import { createContext, Dispatch, ReactNode, useState, SetStateAction, useContext } from "react";

interface CustomContextProps {
    customNumber: number;
    setCustomNumber: Dispatch<SetStateAction<number>>
}

interface CustomContextTwoProps {
    customText: string;
    setCustomText: Dispatch<SetStateAction<string>>
}

const initialStateOne: CustomContextProps = {
    customNumber: 0,
    setCustomNumber: () => {},
};

const initialStateTwo: CustomContextTwoProps = {
    customText: "",
    setCustomText: () => {},
};

type ContextProps = {
    CustomContextProps: CustomContextProps;
    CustomContextTwoProps: CustomContextTwoProps;
};

const CustomContext = createContext<ContextProps>({
    CustomContextProps: initialStateOne,
    CustomContextTwoProps: initialStateTwo,
});

interface CustomContextProviderProps {
    children: ReactNode
}

const CustomContextProvider = ({children}: CustomContextProviderProps) => {
    const [customNumber, setCustomNumber] = useState<number>(0);
    const [customText, setCustomText] = useState<string>("");

    const CustomContextProps: CustomContextProps = { customNumber, setCustomNumber };
    const CustomContextTwoProps: CustomContextTwoProps = { customText, setCustomText };

    return (
        <CustomContext.Provider value={{ CustomContextProps, CustomContextTwoProps }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };