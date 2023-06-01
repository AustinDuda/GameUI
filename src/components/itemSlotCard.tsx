/* Imports */
import styled from 'styled-components';
import React, { useState } from 'react';
import { MouseTrackerOverlay } from './mouseTrackerOverlay';


/* Setting styles */
const Card = styled.div<{index: number, image: string}>`
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
type ItemSlotCardTypes = {
    index: number;
    slot: string
}


/* Component */
export const ItemSlotCard = (props: ItemSlotCardTypes) => {
    const [showInfo, setShowInfo] = useState(false);
    const bankSlotImage = props.index ? (props.index).toString().replace(/\s+/g, '-').toLowerCase() : 'blank';

    /* Renderer */
    return (
        <>
            <Card 
                index={props.index}
                image={bankSlotImage}
                className={props.slot}
                onMouseEnter={() => { setShowInfo(true); }}
                onMouseLeave={() => { setShowInfo(false);}}>
                    <p>{props.index}</p>
            </Card>

            {showInfo ? ( 
                <MouseTrackerOverlay name={(props.slot).toString()}></MouseTrackerOverlay>
            ): null}
        </>
    )
}
