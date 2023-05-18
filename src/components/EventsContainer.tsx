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
    const { PlayerGoldContext } = useContext(CustomContext);

    
    /* */
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(false);
        }, 1000);

        if (opened) {
            const patchData = async (value: number) => {
                const stringifiedData = JSON.stringify({data: value});
    
                try {
                    const response = await fetch('/api/playerCommonData/gold', {
                        method: 'PATCH',
                        body: stringifiedData,
                        headers: {
                            'Content-type':  'application-json'
                        }
                    });
    
                    const responseData = await response.json();
                    PlayerGoldContext.setGold(responseData.gold);
                } catch (error) {
                    console.log('Error adding gold')
                }
            }
    
            patchData(1);
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
            {opened ? <p>We've opened a chest!</p> : null}
            <img src='/images/chest-closed.png' />
        </EventsWrapper>
    )
}
