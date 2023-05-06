/* Imports */
import React from 'react';
import styled from 'styled-components';


/* Setting styles */
const EventsWrapper = styled.div`

    img {
        margin: 3.2rem auto 0 auto;
    }
`;


/* Component */
export const EventsContainer = () => {
    /* Renderer */
    return (
        <EventsWrapper>
            <h1>Events</h1>
            <img src='/images/chest-closed.png' />
        </EventsWrapper>
    )
}
