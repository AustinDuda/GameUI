/* Imports */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { PLAYERDATATYPES } from '@/configs/enums';
import { CustomContext } from '@/context/customContext';

/* Setting styles */
const TestWrapper = styled.div`
    p {
        left: 50%;
        position: absolute;
        text-align: center;    
        transform: translateX(-50%);
    }

    img {
        width: 3.2;
        cursor: pointer;
        margin: 3.2rem auto 0 auto;
    }
`;


/* Component */
export const TestContainer = () => {
    const [opened, setOpened] = useState(false);
    const { getData } = useApiGet('/api/playerData', PLAYERDATATYPES.bank);
    const { PlayerGoldContext } = useContext(CustomContext);
    /* */
    useEffect(() => {
        if (!getData) return;
        if (opened) {
            PlayerGoldContext.setGold(PlayerGoldContext. gold + 1);
            setOpened(false);
        }
    }, [opened])


    /* */
    const openChest = () => {
        if (!getData) return;
        const getItemIndexIfExists = 1;

        if (getItemIndexIfExists === 1) {
            setOpened(true);
        }
    }


    /* Renderer */
    return (
        <TestWrapper onClick={() => { openChest() }}>
            <h1>Events</h1>
            {opened ? <p>We've gained gold</p> : null}
            <img src='/images/chest-closed.png' />
        </TestWrapper>
    )
}
