/* */
import { BankCard } from './bankCard';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { DraggableCursor } from './draggableCursor';
import React, { ReactNode, useEffect, useState } from 'react';


const BankCardWrapper = styled.div`
    display: grid;
    row-gap: 1.2rem;
    column-gap: 1.2rem;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
`;

export const BankContainer = () => {
    const [swapBankSlot, setSwapBankSlot] = useState(-1);
    const { getData } = useApiGet('/api/playerData', 'bank');
    const [selectedBankSlot, setSelectedBankSlot] = useState(-1);
    const [BankSlots, setBankSlots] = useState(Array.from(Array(48).keys()));

    /* Fetches player skill data from the playerData API */
    useEffect(() => {
        if (getData === null) return;
        console.log(getData)
    }, [getData]);


    /* */
    const test = (e: Event) => {
        if (selectedBankSlot == -1) return;

        const target = e.target as HTMLInputElement;
        
        if (!target?.classList.contains('bank-card')) { 
            setSwapBankSlot(-2)
        }
    }

    /* */
    const swapPositionsInAnArray = (array: Array<number>, index1: number, index2: number) => {
           setBankSlots(prevState => {
            let data = [...prevState];
        
            let temp = data[index1];
            data[index1] = data[index2];
            data[index2] = temp;
        
            return data;
        })
    }

    
    /* */
    useEffect(() => {
        if (selectedBankSlot > -1 
            && swapBankSlot > -1 
            && selectedBankSlot != swapBankSlot) {
            swapPositionsInAnArray(BankSlots, selectedBankSlot, swapBankSlot)
        }

        setSelectedBankSlot(-1);
        setSwapBankSlot(-1);
    }, [swapBankSlot]);


    /* */
    useEffect(() => {
        if (selectedBankSlot > -1) {
            // set mouse cursor image
        } else { 
            // unset mouse cursor image
        };
    }, [selectedBankSlot])

    
    /* */
    useEffect(() => {
        window.addEventListener('mouseup',  (e) => { test(e) })

        return () => {
            window.removeEventListener('mouseup', (e) => { test(e) });
        }
    }, []);


    return (
        <div>
            <h1>Bank</h1>
            <BankCardWrapper>
                {BankSlots.map((item, index): ReactNode => {
                    return (
                        <BankCard
                            key={index}
                            item={item}
                            index={index}
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
