/* Imports */
import React, { ReactNode, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';


/* Setting styles */
const SnackbarWrapper = styled.div`
    left: 50%;
    width: 24rem;
    height: 6rem;   
    bottom: 2.4rem;
    position: absolute;
    transform: translateX(-50%);
`;

const SnackbarItem = styled.div`
    left: 50%;
    bottom: 0;
    width: auto;
    padding: 1.2rem;
    position: absolute;
    white-space: nowrap;
    background: #1f283e;
    border-radius: 0.3rem;
    animation: slideIn 0.5s;
    transform: translateX(-50%) translateY(-50%);
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1);

    @keyframes slideIn {
        from { transform: translateX(-50%) translateY(50%); }
        to   { transform: translateX(-50%) translateY(-50%); }
    }
`;

type SnackbarItemTypes = {
    message: string
}

type SnackbarTypes = {
    snackbarItemsGetter: Array<SnackbarItemTypes>,
    snackbarItemsSetter: React.Dispatch<SetStateAction<Array<SnackbarItemTypes>>>
}


/* Component */
export const Snackbar = (props: SnackbarTypes) => {

    /* */
    const removeLastSnackbarItem = () => {
        props.snackbarItemsSetter((prevState) => 
            (prevState.slice(1)
        ));
    }

    /* */
    useEffect(() => {
        const timer = setTimeout(() => {
            removeLastSnackbarItem();
        }, 1000);

        if (props.snackbarItemsGetter.length > 3) {
            removeLastSnackbarItem();
        }

        return () => clearTimeout(timer);
    }, [props]);

    /* Renderer */
    return (
        <SnackbarWrapper>
            {props.snackbarItemsGetter.map((item, index): ReactNode => {
                return (
                    <SnackbarItem key={item.message + index}>
                        <img />
                        <p>{item.message}</p>
                    </SnackbarItem>
                )
            })}
        </SnackbarWrapper>
    )
}