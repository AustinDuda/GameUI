import React from 'react';
import styled from 'styled-components';

type ProgressBarTypes = {
    width: number;
    theme: string;
};

const ProgressBarWrapper: any = styled.div<ProgressBarTypes>`
    width: 100%;
    height: 1.2rem;
    position: relative;
    background: #1a2035;
    border-radius: 0.2rem;
    margin-bottom: 2.4rem;

    &:before {
        content: '';
        top: 0;
        left: 0;
        height: 100%;
        position: absolute;
        border-radius: 0.2rem;
        width: ${props => props.width}%;
        transition: width 0.15s ease-in-out;
        background: ${props => props.theme == 'primary' ? 'linear-gradient(60deg,#f5700c,#ff9800)' : 'linear-gradient(60deg, #288c6c, #4ea752)'};
    }
`;

export const ProgressBar = (props: ProgressBarTypes) => {
    return (
        <ProgressBarWrapper theme={props.theme} width={props.width ? props.width : 0}></ProgressBarWrapper>
    )
}
