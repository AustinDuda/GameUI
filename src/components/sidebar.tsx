import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

const sidenavItems = ['Home', 'Shop', 'Skills'];

const SidebarWapper = styled.div`
    top: 0;
    left: 0;
    width: 20rem;
    height: 100vh;
    position: fixed;
    padding: 0.8rem 1.2rem;
    background-size: cover;
    background-position: center;
    background-image: url(/images/bg.jpg);
    box-shadow: 0.6rem 0.6rem 1.2rem rgba(0,0,0,.1);

    &:after {
        content: '';
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0.92;
        position: absolute;
        background: #1f283e;
    }
`;

const SidebarListItem = styled.li`
    z-index: 1;
    line-height: 1;
    cursor: pointer;
    position: relative;
    padding: 1.2rem 2rem;
    border-radius: 0.3rem;
    padding-bottom: 1.2rem;

    &.active {
        color: white;
        background: linear-gradient(60deg,#288c6c,#4ea752);
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
