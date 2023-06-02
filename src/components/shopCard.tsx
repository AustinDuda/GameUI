/* Imports */
import styled from 'styled-components';
import { CustomContext } from '@/context/customContext';
import React, { useState, useEffect, useRef, ReactNode, useContext } from 'react';

type shopDataTypes = {
    id: string;
    quantity: number;
    price: number;
}

/* Setting styles */
const Card = styled.div`
    display: flex;
    padding: 2.4rem;
    cursor: pointer;
    text-align: left;
    align-items: center;
    background: #202940;
    margin-bottom: 1.2rem;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    border: 0.1rem solid transparent;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);

    &.active {
        border: 0.1rem solid #288c6c;
    }

    h3 {
        margin: 0;
    } 
    
    p {
        margin: 0;
        color: #ff9800;
        margin-left: auto;
        font-family: RobotoBold;
    }

    button {
        color: white;
        margin-left: 2.4rem;
        border-radius: 0.4rem;
        padding: 0.4rem 1.2rem;
        font-family: RobotoBold;
        background: linear-gradient(60deg,#f5700c,#ff9800);
    }
`;

/* Setting types */
type ShopCardItems = {
    item: shopDataTypes;
};
  

/* Component */
export const ShopCard = (props: ShopCardItems) => {
    const { PlayerGoldContext } = useContext(CustomContext);

    const buyItem = () => {
        if (PlayerGoldContext.gold >= props.item.price) {
            console.log(`You've bought ${props.item.id}`)
        }
        
    }

    /* Renderer */
    return (
        <Card>
            <h3>{props.item.id}</h3>
            <p>Price: {props.item.price} ({props.item.quantity})</p>
            <button onClick={() => { buyItem() }}>Buy</button>
        </Card>
    )
}
