/* */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


/* */
type MouseTrackerOverlayTypes = {
    name: string;
};

/* */
const OverlayWrapper: any = styled.div`
    z-index: 2;
    padding: 2.4rem;
    position: fixed;
    background: #202940;
    border-radius: 0.3rem;
    border: 0.1rem solid transparent;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);
`;

/* */
export const MouseTrackerOverlay = (props: MouseTrackerOverlayTypes) => {
    const [cursorPosition, setCursorPosition] = useState({top: -99, left: -99});

    /* */
    const onMouseMove = (e: MouseEvent) => {
        setCursorPosition({ top: e.screenY - 50, left: e.screenX });
    }

     /* */
    useEffect(() => {
        window.addEventListener('mousemove', (e) => { onMouseMove(e); });

        return () => {
            window.removeEventListener('mousemove', (e) => { onMouseMove(e); });
        }
    }, []);

    return (
        <OverlayWrapper style={{...cursorPosition}}>{props.name}</OverlayWrapper>
    )
}