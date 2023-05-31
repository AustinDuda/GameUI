/* Imports */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
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
    const [opened, setOpened] = useState(false);
    const [message, setMessage] = useState('');
    const { PlayerGoldContext } = useContext(CustomContext);
    const { PlayerBankContext } = useContext(CustomContext);
    
    /* */
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpened(false);
            setMessage('');
        }, 1000);

        if (opened) {
            PlayerGoldContext.setGold(prevGold => prevGold + 10);
            
            PlayerBankContext.setBank(prevBank => {
                const existingObject = prevBank.find(obj => obj.id === '0003');

                if (existingObject) {
                  return prevBank.map(obj => {
                    if (obj.id === '0003') {
                      return { ...obj, quantity: obj.quantity + 1 };
                    }
                    return obj;
                  });
                }
              
                return [...prevBank, { id: '0003', name: 'Golden Key', quantity: 1 }];
              });

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
