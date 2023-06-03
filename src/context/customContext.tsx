/* imports */
import { Snackbar } from "@/components/snackbar";
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
    {slot: 'off-hand', id: '', name: ''}
];

const initialToolbeltData = [
    {slot: 'woodcutting', id: '', name: ''},
    {slot: 'mining', id: '', name: ''},
    {slot: 'fishing', id: '', name: ''}
];


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


/* Player Toolbelt State */
interface ToolbeltDataTypes {
    id: string;
    slot: string;
    name: string;
}

interface PlayerToolbeltContext {
    toolbelt: Array<ToolbeltDataTypes>;
    setToolbelt: Dispatch<SetStateAction<Array<ToolbeltDataTypes>>>
}

const initialPlayerToolbelt: PlayerToolbeltContext = {
    toolbelt: [],
    setToolbelt: () => {},
};


/* Snackbar State */
interface SnackbarDataTypes {
    type: string;
    message: string;
}

interface SnackbarContext {
    snackbar: Array<SnackbarDataTypes>;
    setSnackbar: Dispatch<SetStateAction<Array<SnackbarDataTypes>>>
}

const initialSnackbar: SnackbarContext = {
    snackbar: [],
    setSnackbar: () => {},
};



/* Setting state prop types */
type ContextProps = {
    SnackbarContext: SnackbarContext;
    PlayerGoldContext: PlayerGoldContext;
    PlayerBankContext: PlayerBankContext;
    PlayerSkillsContext: PlayerSkillsContext;
    PlayerToolbeltContext: PlayerToolbeltContext;
    PlayerEquipmentContext: PlayerEquipmentContext;
};


/* Creating context */
const CustomContext = createContext<ContextProps>({
    SnackbarContext: initialSnackbar,
    PlayerGoldContext: initialPlayerGold,
    PlayerBankContext: initialPlayerBank,
    PlayerSkillsContext: initialPlayerSkills,
    PlayerToolbeltContext: initialPlayerToolbelt,
    PlayerEquipmentContext: initialPlayerEquipment,
});


/* Setting children types for context provider */
interface ContextProviderProps {
    children: ReactNode
}


/* Component */
const CustomContextProvider = ({children}: ContextProviderProps) => {
    const [gold, setGold] = useState<number>(0);
    const [snackbar, setSnackbar] = useState<Array<SnackbarDataTypes>>([]);
    const [bank, setBank] = useState<Array<BankItemDataTypes>>(initialBankData);
    const [skills, setSkills] = useState<Array<SkillsDataTypes>>(initialSkillData);
    const [toolbelt, setToolbelt] = useState<Array<ToolbeltDataTypes>>(initialToolbeltData);
    const [equipment, setEquipment] = useState<Array<EquipmentDataTypes>>(initialEquipmentData);
    
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const PlayerBankContext: PlayerBankContext = { bank, setBank };
    const SnackbarContext: SnackbarContext = { snackbar, setSnackbar };
    const PlayerSkillsContext: PlayerSkillsContext = { skills, setSkills };
    const PlayerToolbeltContext: PlayerToolbeltContext = { toolbelt, setToolbelt};
    const PlayerEquipmentContext: PlayerEquipmentContext = { equipment, setEquipment };

    useEffect(() => {
        const savedPlayerGold = localStorage.getItem('btPlayerGold');
        const savedPlayerBank = localStorage.getItem('btPlayerBank');
        const savedPlayerSkills = localStorage.getItem('btPlayerSkills');
        const savedPlayerToolbelt = localStorage.getItem('btPlayerToolbelt');
        const savedPlayerEquipment = localStorage.getItem('btPlayerEquipment');

        if (savedPlayerGold) setGold(parseInt(savedPlayerGold));
        if (savedPlayerBank) setBank(JSON.parse(savedPlayerBank));
        if (savedPlayerSkills) setSkills(JSON.parse(savedPlayerSkills));
        if (savedPlayerToolbelt) setToolbelt(JSON.parse(savedPlayerToolbelt));
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
        localStorage.setItem('btPlayerToolbelt', JSON.stringify(toolbelt));
    }, [toolbelt]);


    useEffect(() => {
        localStorage.setItem('btPlayerEquipment', JSON.stringify(equipment));
    }, [equipment]);


    /* Renderer */
    return (
        <CustomContext.Provider 
            value={{ 
                SnackbarContext,
                PlayerGoldContext, 
                PlayerBankContext, 
                PlayerSkillsContext,
                PlayerToolbeltContext,
                PlayerEquipmentContext 
            }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };
