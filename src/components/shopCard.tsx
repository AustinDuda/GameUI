/* Imports */
import styled from 'styled-components';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

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

    button {
        color: white;
        margin-left: auto;
        border-radius: 0.4rem;
        padding: 0.4rem 1.2rem;
        font-family: RobotoBold;
        background: linear-gradient(60deg,#f5700c,#ff9800);
    }
`;

/* Setting types */
type ShopCardItems = {
    item: string;
};
  

/* Component */
export const ShopCard = (props: ShopCardItems) => {

    const [active, setActive] = useState(false);

    /* Renderer */
    return (
        <Card onClick={() => { setActive(!active) }} className={active ? 'active' : ''}>
            <h3>{props.item}</h3>

            <button>Buy</button>
        </Card>
    )
}
