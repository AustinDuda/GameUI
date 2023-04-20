import React, { ReactNode, SetStateAction, useState } from 'react';
import styled from 'styled-components';

const sidenavItems = ['Home', 'Shop', 'Skills'];

const SidebarWapper = styled.div`
    top: 0;
    left: 0;
    width: 20rem;
    height: 100vh;
    padding: 2rem;
    position: fixed;
    background: white;
`;

type SidebarTypes = {
    activeSidebarItemSetter: React.Dispatch<SetStateAction<number>>
};

export const Sidebar = (props: SidebarTypes) => {
    return (
        <SidebarWapper>
            <ul>
                {sidenavItems.map((item, index): ReactNode => {
                    return (
                        <li 
                            id={item}
                            key={item}
                            onClick={() => { props.activeSidebarItemSetter(index) }}
                        >{item}</li>
                    )
                })}
            </ul>
        </SidebarWapper>
    )
}
