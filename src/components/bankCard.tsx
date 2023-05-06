/* Imports */
import styled from 'styled-components';
import React, { SetStateAction, useState } from 'react';
import { DraggableCursor } from './draggableCursor';
import { MouseTrackerOverlay } from './mouseTrackerOverlay';


/* Setting styles */
const Card = styled.div<{isSelected: number, index: number, image: string}>`
    display: flex;
    padding: 0.8rem;
    cursor: pointer;
    text-align: left;
    min-height: 8rem;
    user-select: none;
    position: relative;
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
        : `url("/images/items/icon-item-${props.image}.png")`
    };

    &:hover {
        border-color: grey;

        > div {
            display: block
        }
    }

    p {
        margin: 0;
        color: white;
        align-self: flex-end;
        font-family: RobotoBold;
    }

    * {
        pointer-events: none;
    }
`;


/* */
type BankCardTypes = {
    index: number;
    selectedBankSlotGetter: number;
    item: {name: string, quantity: number};
    swapBankSlotSetter: React.Dispatch<SetStateAction<number>>;
    selectedBankSlotSetter: React.Dispatch<SetStateAction<number>>;
}


/* Component */
export const BankCard = (props: BankCardTypes) => {
    const [showInfo, setShowInfo] = useState(false);
    const quantity = props.item.quantity > 1000 
    ? Math.floor((props.item.quantity/1000)*10) *.1 + 'k' : props.item.quantity;
    const bankSlotImage = props.item ? (props.item.name).replace(/\s+/g, '-') : 'blank';


    /* Renderer */
    return (
        <>
            <Card 
                index={props.index}
                className='bank-card'
                image={bankSlotImage}
                isSelected={props.selectedBankSlotGetter}
                onMouseEnter={() => { setShowInfo(true); }}
                onMouseLeave={() => { setShowInfo(false);}}
                onMouseUp={() => { props.swapBankSlotSetter(props.index) }}
                onMouseDown={() => { props.selectedBankSlotSetter(props.index) }}>
                <p>{props.item ? quantity : ''}</p>
            </Card>
            {showInfo && props.selectedBankSlotGetter != props.index ? ( 
                <MouseTrackerOverlay name={props.item.name}></MouseTrackerOverlay>
            ): null}
        </>
    )
}
