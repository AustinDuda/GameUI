/* Imports */
import styled from 'styled-components';
import React, { useState, useEffect, useRef, ReactNode, SetStateAction } from 'react';

/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    cursor: pointer;
    text-align: left;
    user-select: none;
    background: #202940;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    border: 0.1rem solid transparent;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);

    &:hover {
        border-color: grey;
    }
`;

type BankCardTypes = {
    item: number;
    index: number;
    swapBankSlotSetter: React.Dispatch<SetStateAction<number>>;
    selectedBankSlotSetter: React.Dispatch<SetStateAction<number>>;
}

/* Component */
export const BankCard = (props: BankCardTypes) => {

    /* Renderer */
    return (
        <Card 
            className='bank-card'
            onMouseUp={() => { props.swapBankSlotSetter(props.index) }}
            onMouseDown={() => { props.selectedBankSlotSetter(props.index) }}>
            <p>{props.item}</p>
        </Card>
    )
}
