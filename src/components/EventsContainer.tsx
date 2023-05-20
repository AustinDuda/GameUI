/* Imports */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useAuth } from "@/context/authContext";
import { CustomContext } from '@/context/customContext';


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
    const { user } = useAuth()
    const [opened, setOpened] = useState(false);
    const [message, setMessage] = useState('');
    const { PlayerGoldContext } = useContext(CustomContext);

    
    /* */
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(false);
            setMessage('');
        }, 1000);

        if (opened) {
            const patchData = async () => {
                const stringifiedData = JSON.stringify({uid: user.uid});

                try {
                    const response = await fetch('/api/actions/openChest', {
                        method: 'POST',
                        body: stringifiedData,
                        headers: {
                            'Content-type':  'application-json'
                        }
                    });
    
                    const responseData = await response.json();

                    if (responseData.gold) {
                        setMessage('You\'ve successfully opened a chest!')
                        PlayerGoldContext.setGold(responseData.gold);
                    } else {
                        setMessage('No key.')
                    }
                    
                } catch (error) {
                    console.log('Error adding gold')
                }
            }
            
            patchData();
        }

        return () => clearTimeout(timer);
    }, [opened])


    /* */
    const openChest = () => {
        setOpened(true);
    }


    /* Renderer */
    return (
        <EventsWrapper
            onClick={() => { openChest() }}
        >
            <h1>Events</h1>
            {opened ? <p>{ message }</p> : null}
            <img src='/images/chest-closed.png' />
        </EventsWrapper>
    )
}
