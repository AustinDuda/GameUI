import styled from 'styled-components';
import { ShopCard } from "@/components/shopCard";
import React, { ReactNode, useEffect, useState } from 'react';

const fakeShopData = ['Iron Hatchet', 'Clay Pot', 'Feathers']


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

const Hero = styled.div`
    height: 28rem;
    background-size: cover;
    background-image: url('/images/shop-image.png');
`;

export const ShopContainer = () => {

    return (
        <div>
            <Hero>
                <h1>Shop</h1>
            </Hero>
            <ul>
                {fakeShopData.map((item, index): ReactNode => {
                    {console.log(item)}
                    return (
                        <ShopCard
                            key={index}
                            item={item}
                        ></ShopCard>
                    )
                })}
            </ul>
        </div>
    )
}
