/* Imports */
import styled from 'styled-components';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    cursor: pointer;
    text-align: left;
    background: #202940;
    margin-bottom: 1.2rem;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    border: 0.1rem solid transparent;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);

    &.active {
        border: 0.1rem solid #288c6c;
    }
`;

/* Component */
export const ShopCard = () => {

    const [active, setActive] = useState(false);

    /* Renderer */
    return (
        <Card onClick={() => { setActive(!active) }} className={active ? 'active' : ''}>
            <h3>Shop Item</h3>
        </Card>
    )
}
