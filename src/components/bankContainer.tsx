/* Imports */
import { BankCard } from './bankCard';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { DraggableCursor } from './draggableCursor';
import React, { ReactNode, useEffect, useState } from 'react';


/* Setting styles */
const BankCardWrapper = styled.div`
    display: grid;
    row-gap: 1.2rem;
    column-gap: 1.2rem;
    grid-template-columns: repeat(auto-fit, minmax(7rem, 8rem));
`;


/* Component */
export const BankContainer = () => {
    const [swapBankSlot, setSwapBankSlot] = useState(-1);
    const { getData } = useApiGet('/api/playerData', 'bank');
    const [selectedBankSlot, setSelectedBankSlot] = useState(-1);
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
