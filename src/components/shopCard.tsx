/* Imports */
import styled from 'styled-components';
import { CustomContext } from '@/context/customContext';
import React, { useState, useEffect, useRef, ReactNode, useContext } from 'react';
import { useBankHandler } from '@/hooks/useBankHandler';

type shopDataTypes = {
    id: string;
    name: string;
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
        display: flex;
        color: #d48c00;
        margin-left: auto;
        align-items: center;
        font-family: RobotoBold;

        img {
            margin-left: 0.4rem;
        }
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
    const { updatePlayerBank } = useBankHandler();
    const { PlayerGoldContext } = useContext(CustomContext);

    const buyItem = () => {
        if (PlayerGoldContext.gold >= props.item.price) {
            updatePlayerBank('copperOre', 1);
            PlayerGoldContext.setGold(prevGold => prevGold - props.item.price);
        } else {
            console.log('not enough gold')
        }
        
    }

    /* Renderer */
    return (
        <Card>
            <h3>{props.item.name}</h3>
            <p>{props.item.price} <img src="/images/icon-gold-coin.png" width={24} height={24} /></p>
            <button onClick={() => { buyItem() }}>Buy</button>
        </Card>
    )
}
