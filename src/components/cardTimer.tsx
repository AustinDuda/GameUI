import React from 'react';
import styled from 'styled-components';

type CardTimerTypes = {
    progress: number;
    total: number
};

const ProgressBar: any = styled.div<{width: number}>`
    width: 100%;
    height: 2.4rem;
    position: relative;
    border: white solid 0.1rem;

    &:before {
        content: '';
        top: 0;
        left: 0;
        height: 100%;
        background: green;
        position: absolute;
        width: ${props => props.width}%;
        transition: width 0.25s ease-in;
    }
`;

export const CardTimer = (props: CardTimerTypes) => {
    return (
        <ProgressBar width={(props.progress/props.total) * 100}></ProgressBar>
    )
}
