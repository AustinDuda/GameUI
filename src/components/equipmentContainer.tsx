/* Imports */
import styled from 'styled-components';
import React, { ReactNode, useContext, useEffect } from 'react';
import { CustomContext } from '@/context/customContext';
import { ItemSlotCard } from './itemSlotCard';

const test = [{slot: 'head', id: '', name: ''},
    {slot: 'chest', id: '', name: ''},
    {slot: 'legs', id: '', name: ''},
    {slot: 'shoulder', id: '', name: ''},
    {slot: 'hands', id: '', name: ''},
    {slot: 'feet', id: '', name: ''},
    {slot: 'back', id: '', name: ''},
    {slot: 'main-hand', id: '', name: ''},
    {slot: 'off-hand', id: '', name: ''},
    {slot: 'ring', id: '', name: ''},
    {slot: 'necklace', id: '', name: ''},
    {slot: 'earring', id: '', name: ''}]


/* Setting styles */
const EquipmentWrapper = styled.div`
    margin: 0 auto;
    padding: 1.2rem;
`;

const EquipmentCardsWrapper = styled.div`
    display: grid;
    grid-row-gap: 2rem;
    text-align: center;
    grid-column-gap: 2rem;
    grid-template-columns: repeat(3, 8rem);
`;


/* Component */
export const EquipmentContainer = () => {
    const { PlayerEquipmentContext } = useContext(CustomContext);
    
    /* */
    useEffect(() => {
    }, [])

    /* Renderer */
    return (
        <EquipmentWrapper>
            <h3>Equipment</h3>
            <EquipmentCardsWrapper>
                {PlayerEquipmentContext.equipment ? (
                    PlayerEquipmentContext.equipment?.map((equipmentSlot, index): ReactNode => {
                        return (
                            <ItemSlotCard
                                index={index}
                                slot={equipmentSlot.slot}
                                key={equipmentSlot.slot + index}
                            ></ItemSlotCard>
                        )
                    })
                ): null}
            </EquipmentCardsWrapper>
        </EquipmentWrapper>
    )
}
