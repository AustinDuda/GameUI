import React, { ReactNode, useEffect, useState } from 'react';
import { BankCard } from './bankCard';
import styled from 'styled-components';

const BankCardWrapper = styled.div`
    display: grid;
    row-gap: 1.2rem;
    column-gap: 1.2rem;
    grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
`;

export const BankContainer = () => {
    const [swapBankSlot, setSwapBankSlot] = useState(-1);
    const [selectedBankSlot, setSelectedBankSlot] = useState(-1);
    const [BankSlots, setBankSlots] = useState(Array.from(Array(48).keys()));

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
            console.log('set mouse cursor')
        } else { 
            console.log('clear mouse cursor') 
        };
    }, [selectedBankSlot])

    
    /* */
    useEffect(() => {
        window.addEventListener('mouseup',  (e) => { test(e) })

        return () => {
            // Save inventory positions here
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
                            selectedBankSlotSetter={setSelectedBankSlot}
                        ></BankCard>
                    )
                })}
            </BankCardWrapper>
        </div>
    )
}
