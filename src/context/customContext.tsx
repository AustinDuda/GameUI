/* imports */
import { useAuth } from "@/context/authContext";
import { createContext, Dispatch, ReactNode, useState, SetStateAction, useEffect } from "react";


/* Setting preliminary values */
const initialSkillData = [
    {name: 'woodcutting', xp: 0},
    {name: 'fishing', xp: 0},
    {name: 'mining', xp: 999}
]

const initialBankData = [
    {id: 'simpleIronPickaxe', name: 'Simple Iron Pickaxe', quantity: 1},
    {id: 'simpleIronHatchet', name: 'Simple Iron Hatchet', quantity: 1},
]


/* Player Gold state */
interface PlayerGoldContext {
    gold: number;
    setGold: Dispatch<SetStateAction<number>>
}

const initialPlayerGold: PlayerGoldContext = {
    gold: 1,
    setGold: () => {},
};

/* Player Bank State */
interface BankItemDataTypes {
    id: string;
    name: string;
    quantity: number;
}

interface PlayerBankContext {
    bank: Array<BankItemDataTypes>;
    setBank: Dispatch<SetStateAction<Array<BankItemDataTypes>>>
}

const initialPlayerBank: PlayerBankContext = {
    bank: [{id: '-1', name: '', quantity: -1}],
    setBank: () => {},
};

/* Player skills State */
interface SkillsDataTypes {
    name: string;
    xp: number;
}

interface PlayerSkillsContext {
    skills: Array<SkillsDataTypes>;
    setSkills: Dispatch<SetStateAction<Array<SkillsDataTypes>>>
}

const initialPlayerSkills: PlayerSkillsContext = {
    skills: [{name: '', xp: -1}],
    setSkills: () => {},
};


/* Setting state prop types */
type ContextProps = {
    PlayerGoldContext: PlayerGoldContext;
    PlayerBankContext: PlayerBankContext;
    PlayerSkillsContext: PlayerSkillsContext;
};


/* Creating context */
const CustomContext = createContext<ContextProps>({
    PlayerGoldContext: initialPlayerGold,
    PlayerBankContext: initialPlayerBank,
    PlayerSkillsContext: initialPlayerSkills
});


/* Setting children types for context provider */
interface ContextProviderProps {
    children: ReactNode
}


/* Component */
const CustomContextProvider = ({children}: ContextProviderProps) => {
    const [gold, setGold] = useState<number>(0);
    const [bank, setBank] = useState<Array<BankItemDataTypes>>(initialBankData);
    const [skills, setSkills] = useState<Array<SkillsDataTypes>>(initialSkillData);
    
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const PlayerBankContext: PlayerBankContext = { bank, setBank };
    const PlayerSkillsContext: PlayerSkillsContext = { skills, setSkills };


    useEffect(() => {
        const savedPlayerGold = localStorage.getItem('btPlayerGold');
        const savedPlayerBank = localStorage.getItem('btPlayerBank');
        const savedPlayerSkills = localStorage.getItem('btPlayerSkills');

        if (savedPlayerGold) setGold(parseInt(savedPlayerGold));
        if (savedPlayerBank) setBank(JSON.parse(savedPlayerBank));
        if (savedPlayerSkills) setSkills(JSON.parse(savedPlayerSkills));
    }, []);


    useEffect(() => {
        localStorage.setItem('btPlayerGold', gold.toString());
    }, [gold]);


    useEffect(() => {
        localStorage.setItem('btPlayerBank', JSON.stringify(bank));
    }, [bank]);


    useEffect(() => {
        localStorage.setItem('btPlayerSkills', JSON.stringify(skills));
    }, [skills]);


    /* Renderer */
    return (
        <CustomContext.Provider value={{ PlayerGoldContext, PlayerBankContext, PlayerSkillsContext }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };
