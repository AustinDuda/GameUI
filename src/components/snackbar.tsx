/* Imports */
import styled from 'styled-components';
import { CustomContext } from '@/context/customContext';
import React, { ReactNode, SetStateAction, useContext, useEffect } from 'react';


/* Setting styles */
const SnackbarWrapper = styled.div`
    left: 50%;
    height: 12rem;
    bottom: 2.4rem;
    min-width: 28rem;
    position: absolute;
    transform: translateX(-50%);
`;

const SnackbarItem = styled.div<{position: number}>`
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    padding: 1.2rem;
    align-items: center;
    white-space: nowrap;
    background: #1f283e;
    border-radius: 0.3rem;
    margin-bottom: 1.2rem;
    animation: slideIn 0.5s;
    transform: translateY(-50%);
    transition: all 0.5s ease-in-out;
    opacity: ${props => props.position > 1 ? 0 : 1};
    box-shadow: 0.1rem 0.1rem 0.2rem rgba(0, 0, 0, 0.1);

    @keyframes slideIn {
        from { transform: translateY(50%); }
        to   { transform: translateY(-50%); }
    }

    p {
        margin: 0;
    }

    img {
        margin-right: 0.8rem;
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
export const Snackbar = () => {
    const { SnackbarContext } = useContext(CustomContext)


    const removeLastSnackbarItem = () => {
        SnackbarContext.setSnackbar(prev => prev.slice(1))
    }


    useEffect(() => {
        if (SnackbarContext.snackbar.length < 1) return;

        const timer = setTimeout(() => {
            removeLastSnackbarItem();
        }, 1000);

        return () => {
            clearTimeout(timer); 
        } 
    }, [SnackbarContext]);

    /* Renderer */
    return (
        <SnackbarWrapper>
                {SnackbarContext.snackbar.map((snack, index) => {
                    return (
                        <SnackbarItem
                            position={index}
                            key={snack.message + index}>
                                <img src={`/images/icon-notification-${snack.type}.png`} width={32} height={32} />
                                <p>{snack.message}</p>
                        </SnackbarItem>
                    )
                })}
        </SnackbarWrapper>
    )
}