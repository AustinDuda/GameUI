/* Imports */
import styled from 'styled-components';
import React, { useState, useEffect, useRef, ReactNode } from 'react';

/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    text-align: left;
    background: #202940;
    margin-bottom: 1.2rem;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);
`;

/* Component */
export const ShopCard = () => {

    /* Renderer */
    return (
        <Card>
            <h3>Shop Item</h3>
        </Card>
    )
}
