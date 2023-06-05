/* Imports */
import styled from 'styled-components';
import { ItemSlotCard } from './itemSlotCard';
import { CustomContext } from '@/context/customContext';
import React, { ReactNode, useContext, useEffect, useState } from 'react';


/* Setting varibles */
const inventoryTabs = ['equipment', 'toolbelt'];


/* Setting styles */
const InventoryWrapper = styled.div`
    margin: 0 auto;
    padding: 1.2rem;
`;

const EquipmentCardsWrapper = styled.div`
    display: grid;
    padding: 2rem;
    grid-row-gap: 2rem;
    text-align: center;
    grid-column-gap: 2rem;
    border-radius: 0.4rem;
    border-top-left-radius: 0;
    border: 0.1rem solid #2d374b;
    grid-template-columns: repeat(3, 8rem);
`;

const Tabs = styled.div`
    display: flex;
`;

const Tab = styled.button<{activeTab: number}>`
    background:#1a2035;
    padding: 0.4rem 1.2rem;
    margin: 0 0.4rem -0.1rem 0;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;
    border-top: 0.1rem solid #2d374b;
    border-left: 0.1rem solid #2d374b;
    border-right: 0.1rem solid #2d374b;
    opacity: ${props => props.activeTab};
    border-bottom: ${props => props.activeTab == 1 
        ? `none` 
        : `0.1rem solid #2d374b`
    };
`;


/* Component */
export const Inventory = () => {
    const [ activeTab, setActiveTab ] = useState(0);
    const { PlayerEquipmentContext, PlayerToolbeltContext } = useContext(CustomContext);
    
    /* */
    useEffect(() => {
    }, [])

    /* Renderer */
    return (
        <InventoryWrapper>
            <h2>Inventory</h2>

            <Tabs>
                {inventoryTabs.map((tab, index) => {
                    return (
                    <Tab 
                        key={index}
                        activeTab={activeTab == index ? 1 : 0.5} 
                        onClick={() => { setActiveTab(index) }}>
                        {tab}
                    </Tab>
                    )
                })}
            </Tabs>

            <EquipmentCardsWrapper>
                {PlayerEquipmentContext.equipment && activeTab == 0 ? (
                    PlayerEquipmentContext.equipment?.map((equipmentSlot, index): ReactNode => {
                        return (
                            <ItemSlotCard
                                index={index}
                                type="equipment"
                                slot={equipmentSlot.slot}
                                key={equipmentSlot.slot + index}
                            ></ItemSlotCard>
                        )
                    })
                ): null}

                {PlayerToolbeltContext.toolbelt && activeTab == 1 ? (
                    PlayerToolbeltContext.toolbelt?.map((toolbeltSlot, index): ReactNode => {
                        return (
                            <ItemSlotCard
                                index={index}
                                type="toolbelt"
                                slot={toolbeltSlot.slot}
                                key={toolbeltSlot.slot + index}
                            ></ItemSlotCard>
                        )
                    })
                ): null}
            </EquipmentCardsWrapper>

        </InventoryWrapper>
    )
}
