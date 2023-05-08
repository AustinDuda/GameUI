/* Imports */
import { BankCard } from './bankCard';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { PLAYERDATATYPES } from '@/configs/enums';
import { DraggableCursor } from './draggableCursor';
import React, { ReactNode, useEffect, useState } from 'react';


/* Setting styles */
const BankCardWrapper = styled.div`
    display: grid;
    row-gap: 1.2rem;
    column-gap: 1.2rem;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 8rem));
`;

const BankCategoryHeader = styled.div`
    display: flex;
    padding: 1.2rem;
    margin: 1.2rem 0;
    align-items: center;
    background: #202940;
    border-radius: 0.6rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);

    h3 {
        margin: 0;
        text-align: left;
    }

    button {
        color: white;
        margin-left: auto;
        border-radius: 0.4rem;
        padding: 0.4rem 1.2rem;
        font-family: RobotoBold;
        background: linear-gradient(60deg,#f5700c,#ff9800);
    }
`;


/* Component */
export const BankContainer = () => {
    const [swapBankSlot, setSwapBankSlot] = useState(-1);
    const [selectedBankSlot, setSelectedBankSlot] = useState(-1);
    const { getData } = useApiGet('/api/playerData', PLAYERDATATYPES.bank);
    const [playerBankData, setPlayerBankData] = useState(Array<{name: string, quantity: number}>);


    /* Fetches player skill data from the playerData API */
    useEffect(() => {
        if (getData === null) return;
        setPlayerBankData(getData)
    }, [getData]);


    /* Deselects bank slot if user clicks outside bank slots */
    const deselectSelectedBankSlot = (e: Event) => {
        if (selectedBankSlot == -1) return;

        const target = e.target as HTMLInputElement;
        
        if (!target?.classList.contains('bank-card')) { 
            setSwapBankSlot(-2)
        }
    }


    /* Swamps the position of items in the bank */
    const swapPositionsInAnArray = (index1: number, index2: number) => {
           setPlayerBankData(prevState => {
            let data = [...prevState];
        
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
        
            return data;
        })
    }

    
    /* Checks if two slots have been selected to be swapped */
    useEffect(() => {
        if (selectedBankSlot > -1 
            && swapBankSlot > -1 
            && selectedBankSlot != swapBankSlot) {
            swapPositionsInAnArray(selectedBankSlot, swapBankSlot)
        }

        setSelectedBankSlot(-1);
        setSwapBankSlot(-1);
    }, [swapBankSlot]);

    
    /* Handles mouse up events for deselection */
    useEffect(() => {
        window.addEventListener('mouseup',  (e) => { deselectSelectedBankSlot(e) })

        return () => {
            window.removeEventListener('mouseup', (e) => { deselectSelectedBankSlot(e) });
        }
    }, []);


    /* Renderer */
    return (
        <div>
            <h1>Bank</h1>
            <BankCategoryHeader><h3>Tab one</h3><button>sort</button></BankCategoryHeader>
            <BankCardWrapper>
                {playerBankData?.map((item, index): ReactNode => {
                    return (
                        <BankCard
                            key={index}
                            index={index}
                            item={item}
                            swapBankSlotSetter={setSwapBankSlot}
                            selectedBankSlotGetter={selectedBankSlot}
                            selectedBankSlotSetter={setSelectedBankSlot}
                        ></BankCard>
                    )
                })}
            </BankCardWrapper>
            {selectedBankSlot != -1 ? ( 
                <DraggableCursor image={''}></DraggableCursor>
            ): null}
        </div>
    )
}
