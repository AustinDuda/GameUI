/* Imports */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { PLAYERDATATYPES } from '@/configs/enums';


/* Setting styles */
const EventsWrapper = styled.div`
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
export const EventsContainer = () => {
    const [opened, setOpened] = useState(false);
    const { getData } = useApiGet('/api/playerData', PLAYERDATATYPES.bank);

    
    /* */
    useEffect(() => {
        if (!getData) return;
        const timer = setTimeout(() => {
            setOpened(false);
        }, 1000);

        return () => clearTimeout(timer);

    }, [opened])


    /* */
    const openChest = () => {
        if (!getData) return;
        const getItemIndexIfExists = getData.findIndex(item => item.name === 'golden key');

        if (getItemIndexIfExists != -1) {
            setOpened(true);
            console.log('remove item from bank')
        }
    }

    
    /* Renderer */
    return (
        <EventsWrapper
            onClick={() => { openChest() }}
        >
            <h1>Events</h1>
            {opened ? <p>We've opened a chest!</p> : null}
            <img src='/images/chest-closed.png' />
        </EventsWrapper>
    )
}
