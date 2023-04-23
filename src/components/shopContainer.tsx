import styled from 'styled-components';
import { ShopCard } from "@/components/shopCard";
import React, { ReactNode, useEffect, useState } from 'react';

const itemPlaceholder = ['', '', ''];

/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    text-align: left;
    background: #202940;
    margin-bottom: 1.2em;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);
`;

export const ShopContainer = () => {

    return (
        <div>
            <h1>Shop</h1>
            <ul>
                {itemPlaceholder.map((items, index): ReactNode => {
                    return (
                        <ShopCard></ShopCard>
                    )
                })}
            </ul>
        </div>
    )
}
