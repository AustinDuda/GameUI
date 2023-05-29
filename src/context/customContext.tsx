/* imports */
import { useAuth } from "@/context/authContext";
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
    const { user } = useAuth();
    const [gold, setGold] = useState<number>(0);
    const [skills, setSkills] = useState<Array<SkillsDataTypes>>([{name: '', xp: -1}]);
    const [bank, setBank] = useState<Array<BankItemDataTypes>>([{id: '-1', name: '', quantity: -1}]);
    
    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const PlayerBankContext: PlayerBankContext = { bank, setBank };
    const PlayerSkillsContext: PlayerSkillsContext = { skills, setSkills };

    useEffect(() => {
        const patchData = async (value: number) => {
            if (!user) return;
            const stringifiedData = JSON.stringify({data: value, uid: user.uid});

            try {
                const response = await fetch('/api/playerCommonData/gold', {
                    method: 'PATCH',
                    body: stringifiedData,
                    headers: {
                        'Content-type':  'application-json'
                    }
                });
                
                const responseData = await response.json();
                if (!isNaN(responseData.gold)) PlayerGoldContext.setGold(responseData.gold);
                
            } catch (error) {
                console.log('Error adding gold')
            }
        }

        const patchData2 = async () => {
            if (!user) return;
            const stringifiedData = JSON.stringify({uid: user.uid});

            try {
                const response = await fetch('/api/playerCommonData/bank', {
                    method: 'PATCH',
                    body: stringifiedData,
                    headers: {
                        'Content-type':  'application-json'
                    }
                });
                
                const responseData = await response.json();
                if (responseData.bank.length) PlayerBankContext.setBank(responseData.bank);

            } catch (error) {
                console.log('Error adding bank')
            }
        }

        const patchData3 = async () => {
            if (!user) return;
            const stringifiedData = JSON.stringify({uid: user.uid});

            try {
                const response = await fetch('/api/playerCommonData/skills', {
                    method: 'PATCH',
                    body: stringifiedData,
                    headers: {
                        'Content-type':  'application-json'
                    }
                });
                
                const responseData = await response.json();
                if (responseData.skills.length) PlayerSkillsContext.setSkills(responseData.skills);

            } catch (error) {
                console.log('Error adding bank')
            }
        }

        patchData(0);
        patchData2();
        patchData3();
    }, [])

    /* Renderer */
    return (
        <CustomContext.Provider value={{ PlayerGoldContext, PlayerBankContext, PlayerSkillsContext }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };
