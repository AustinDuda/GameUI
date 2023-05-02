/* Imports */
import styled from 'styled-components';
import React, { SetStateAction } from 'react';

/* Setting styles */
const Card = styled.div<{isSelected: number, index: number}>`
    display: flex;
    padding: 0.8rem;
    cursor: pointer;
    text-align: left;
    min-height: 8rem;
    user-select: none;
    background: #202940;
    background-size: 50%;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    justify-content: flex-end;
    background-position: center;
    background-repeat: no-repeat;
    border: 0.1rem solid transparent;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);
    opacity: ${props => props.isSelected === props.index 
        ? '.5' 
        : '1'
    };
    background-image: ${props => props.isSelected === props.index 
        ? 'none' 
        : 'url("/images/icon-oak-wood.png")'
    };

    &:hover {
        border-color: grey;
    }

    p {
        margin: 0;
        color: white;
        align-self: flex-end;
        font-family: RobotoBold;
    }
`;

type BankCardTypes = {
    item: number;
    index: number;
    selectedBankSlotGetter: number;
    swapBankSlotSetter: React.Dispatch<SetStateAction<number>>;
    selectedBankSlotSetter: React.Dispatch<SetStateAction<number>>;
}

/* Component */
export const BankCard = (props: BankCardTypes) => {

    /* Renderer */
    return (
        <Card 
            index={props.index}
            className='bank-card'
            isSelected={props.selectedBankSlotGetter}
            onMouseUp={() => { props.swapBankSlotSetter(props.index) }}
            onMouseDown={() => { props.selectedBankSlotSetter(props.index) }}>
            <p>{props.item}</p>
        </Card>
    )
}
