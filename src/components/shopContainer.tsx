import styled from 'styled-components';
import { ShopCard } from "@/components/shopCard";
import React, { ReactNode, useEffect, useState } from 'react';

const fakeShopData = ['Iron Hatchet', 'Clay Pot', 'Feathers']

const shopData = [
    {
        name: 'Shop One',
        items: [
            {id: 'placeholder', name: 'Quality Steel Axe', quantity: 1, price: 199},
            {id: 'placeholder', name: 'Quality Steel Pickaxe', quantity: 1, price: 199},
            {id: 'placeholder', name: 'Quality Steel Pickaxe', quantity: 99, price: 100}
        ]
    },
    {
        name: 'Shop Two',
        items: [
            {id: 'placeholder', name: 'Tin Ore', quantity: 999, price: 5},
            {id: 'placeholder', name: 'Copper Ore', quantity: 999, price: 5},
            {id: 'placeholder', name: 'Iron Ore', quantity: 999, price: 15}
        ]
    },
]


type shopDataTypes = {
    id: string;
    name: string;
    quantity: number;
    price: number;
}


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

            {shopData.map((shop): ReactNode => {
                return (
                    <div key={shop.name}>
                        <h3>{shop.name}</h3>
                        {shop.items.map((item: shopDataTypes, index: number): ReactNode => (
                            <ShopCard
                                key={index}
                                item={item}
                            ></ShopCard>
                        ))}
                    </div>
                )
            })}
        </div>
    )
}
