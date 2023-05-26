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
    quantity: number;
}

interface PlayerBankContext {
    bank: Array<BankItemDataTypes>;
    setBank: Dispatch<SetStateAction<Array<BankItemDataTypes>>>
}

const initialPlayerBank: PlayerBankContext = {
    bank: [{id: '-1', quantity: -1}],
    setBank: () => {},
};


/* Setting state prop types */
type ContextProps = {
    PlayerGoldContext: PlayerGoldContext;
    PlayerBankContext: PlayerBankContext;
};


/* Creating context */
const CustomContext = createContext<ContextProps>({
    PlayerGoldContext: initialPlayerGold,
    PlayerBankContext: initialPlayerBank,
});


/* Setting children types for context provider */
interface ContextProviderProps {
    children: ReactNode
}


/* Component */
const CustomContextProvider = ({children}: ContextProviderProps) => {
    const { user } = useAuth();
    const [gold, setGold] = useState<number>(0);
    const [bank, setBank] = useState<Array<BankItemDataTypes>>([{id: '-1', quantity: -1}]);

    const PlayerGoldContext: PlayerGoldContext = { gold, setGold };
    const PlayerBankContext: PlayerBankContext = { bank, setBank };

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

        patchData(0);
        //patchData2();
    }, [])

    /* Renderer */
    return (
        <CustomContext.Provider value={{ PlayerGoldContext, PlayerBankContext }}>
            {children}
        </CustomContext.Provider>
    )
}

export { CustomContext, CustomContextProvider };
