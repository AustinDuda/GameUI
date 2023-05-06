/* Imports */
import React from 'react';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { PLAYERDATATYPES } from '@/configs/enums';


/* Setting styles */
const EventsWrapper = styled.div`
    img {
        width: 3.2;
        cursor: pointer;
        margin: 3.2rem auto 0 auto;
    }
`;


/* Component */
export const EventsContainer = () => {
    const { getData } = useApiGet('/api/playerData', PLAYERDATATYPES.bank);

    /* */
    const openChest = () => {
        if (!getData) return;
        const getItemIndexIfExists = Array.getData.findIndex(item => item.name === 'oak log');
        console.log(getItemIndexIfExists)
    }

    /* Renderer */
    return (
        <EventsWrapper
            onClick={() => { openChest() }}
        >
            <h1>Events</h1>
            <img src='/images/chest-closed.png' />
        </EventsWrapper>
    )
}
