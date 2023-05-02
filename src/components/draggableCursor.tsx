/* */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';


/* */
type DraggableCursorType = {
    image: string;
};


/* */
const DraggbleCursorWrapper: any = styled.div`
    width: 2.4rem;
    height: 2.4rem;
    position: fixed;
    background-size: cover;
    background-image: url('/images/icon-oak-wood.png');
`;

/* */
export const DraggableCursor = (props: DraggableCursorType) => {
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
        <DraggbleCursorWrapper style={{...cursorPosition}}></DraggbleCursorWrapper>
    )
}