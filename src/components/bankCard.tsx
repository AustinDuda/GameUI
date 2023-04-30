/* Imports */
import styled from 'styled-components';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    cursor: pointer;
    text-align: left;
    background: #202940;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    border: 0.1rem solid transparent;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);

    &:hover {
        border-color: grey;
    }
`;

/* Component */
export const BankCard = () => {

    /* Renderer */
    return (
        <Card>
            <p>0</p>
        </Card>
    )
}
