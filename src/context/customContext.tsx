/* imports */
import { createContext, Dispatch, ReactNode, useState, SetStateAction, useEffect } from "react";


/* Setting preliminary values */
const initialSkillData = [
    {name: 'woodcutting', xp: 0},
    {name: 'fishing', xp: 0},
    {name: 'mining', xp: 999}
];

const initialBankData = [
    {id: 'simpleIronPickaxe', name: 'Simple Iron Pickaxe', quantity: 1},
    {id: 'simpleIronHatchet', name: 'Simple Iron Hatchet', quantity: 1},
];

const initialEquipmentData = [
    {slot: 'earring', id: '', name: ''},
    {slot: 'head', id: '', name: ''},
    {slot: 'earring', id: '', name: ''},
    {slot: 'shoulder', id: '', name: ''},
    {slot: 'necklace', id: '', name: ''},
    {slot: 'back', id: '', name: ''},
    {slot: 'hands', id: '', name: ''},
    {slot: 'chest', id: '', name: ''},
    {slot: 'quiver', id: '', name: ''},
    {slot: 'ring', id: '', name: ''},
    {slot: 'legs', id: '', name: ''},
    {slot: 'ring', id: '', name: ''},
    {slot: 'main-hand', id: '', name: ''},
    {slot: 'feet', id: '', name: ''},
    {slot: 'off-hand', id: '', name: ''},
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
    bank: [],
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
    skills: [],
    setSkills: () => {},
};


/* Player Equipment State */
interface EquipmentDataTypes {
    id: string;
    slot: string;
    name: string;
}

interface PlayerEquipmentContext {
    equipment: Array<EquipmentDataTypes>;
    setEquipment: Dispatch<SetStateAction<Array<EquipmentDataTypes>>>
}

const initialPlayerEquipment: PlayerEquipmentContext = {
    equipment: [],
    setEquipment: () => {},
};


/* Setting state prop types */
type ContextProps = {
    PlayerGoldContext: PlayerGoldContext;
    PlayerBankContext: PlayerBankContext;
    PlayerSkillsContext: PlayerSkillsContext;
    PlayerEquipmentContext: PlayerEquipmentContext;
};


/* Creating context */
const CustomContext = createContext<ContextProps>({
    PlayerGoldContext: initialPlayerGold,
    PlayerBankContext: initialPlayerBank,
    PlayerSkillsContext: initialPlayerSkills,
    PlayerEquipmentContext: initialPlayerEquipment
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
    const [equipment, setEquipment] = useState<Array<EquipmentDataTypes>>(initialEquipmentData);
    
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const PlayerBankContext: PlayerBankContext = { bank, setBank };
    const PlayerSkillsContext: PlayerSkillsContext = { skills, setSkills };
    const PlayerEquipmentContext: PlayerEquipmentContext = { equipment, setEquipment };

    useEffect(() => {
        const savedPlayerGold = localStorage.getItem('btPlayerGold');
        const savedPlayerBank = localStorage.getItem('btPlayerBank');
        const savedPlayerSkills = localStorage.getItem('btPlayerSkills');
        const savedPlayerEquipment = localStorage.getItem('btPlayerEquipment');

        if (savedPlayerGold) setGold(parseInt(savedPlayerGold));
        if (savedPlayerBank) setBank(JSON.parse(savedPlayerBank));
        if (savedPlayerSkills) setSkills(JSON.parse(savedPlayerSkills));
        if (savedPlayerEquipment) setEquipment(JSON.parse(savedPlayerEquipment));
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


    useEffect(() => {
        localStorage.setItem('btPlayerEquipment', JSON.stringify(equipment));
    }, [equipment]);


    /* Renderer */
    return (
        <CustomContext.Provider 
            value={{ 
                PlayerGoldContext, 
                PlayerBankContext, 
                PlayerSkillsContext, 
                PlayerEquipmentContext 
            }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };
