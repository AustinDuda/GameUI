/* Imports */
import styled from 'styled-components';
import { useBankHandler } from '@/hooks/useBankHandler';
import { CustomContext } from '@/context/customContext';
import React, { useContext, useEffect, useState } from 'react';


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
    const { updatePlayerBank } = useBankHandler();
    const [message, setMessage] = useState('');
    const [opened, setOpened] = useState(false);
    const { PlayerGoldContext } = useContext(CustomContext);

    /* */
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(false);
            setMessage('');
        }, 1000);

        if (opened) {
            updatePlayerBank('copperOre', 1);
            PlayerGoldContext.setGold(prevGold => prevGold + 10);
        }

        return () => clearTimeout(timer);
    }, [opened])

    /* Renderer */
    return (
        <EventsWrapper
            onClick={() => { setOpened(true); }}
        >
            <h1>Events</h1>
            {opened ? <p>{ message }</p> : null}
            <img src='/images/chest-closed.png' />
        </EventsWrapper>
    )
}
