import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

const sidenavItems = ['Home', 'Shop', 'Skills'];

const SidebarWapper = styled.div`
    top: 0;
    left: 0;
    width: 20rem;
    height: 100vh;
    position: fixed;
    background: white;
    padding: 0.8rem 0;
`;

const SidebarListItem = styled.li`
    line-height: 1;
    cursor: pointer;
    padding: 1.2rem 2rem;
    padding-bottom: 1.2rem;

    &.active {
        color: white;
        background: darkolivegreen;
    }
`;

type SidebarTypes = {
    activeSidebarItemGetter: number,
    activeSidebarItemSetter: React.Dispatch<SetStateAction<number>>
};

export const Sidebar = (props: SidebarTypes) => {

    return (
        <SidebarWapper>
            <ul>
                {sidenavItems.map((item, index): ReactNode => {
                    const isActive = props.activeSidebarItemGetter === index;
                    
                    return (
                        <SidebarListItem 
                            id={item}
                            key={item}
                            onClick={() => { props.activeSidebarItemSetter(index) }}
                            className={isActive ? 'active' : ''}
                        >{item}</SidebarListItem>
                    )
                })}
            </ul>
        </SidebarWapper>
    )
}
