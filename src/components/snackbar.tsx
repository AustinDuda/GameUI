/* Imports */
import styled from 'styled-components';
import { CustomContext } from '@/context/customContext';
import React, { ReactNode, SetStateAction, useContext, useEffect } from 'react';


/* Setting styles */
const SnackbarWrapper = styled.div`
    left: 50%;
    height: 6rem;   
    bottom: 2.4rem;
    min-width: 28rem;
    position: absolute;
    transform: translateX(-50%);
`;

const SnackbarItem = styled.div`
    left: 50%;
    bottom: 0;
    width: 100%;
    display: flex;
    padding: 1.2rem;
    position: absolute;
    align-items: center;
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

    /* */
    const removeLastSnackbarItem = () => {
        /*props.snackbarItemsSetter((prevState) => 
            (prevState.slice(1)
        ));*/
    }

    /* */
    useEffect(() => {
        console.log(SnackbarContext.snackbar)
        /*if (props.snackbarItemsGetter.length < 1) return;
        if (props.snackbarItemsGetter.length > 3) removeLastSnackbarItem();*/

        /*const timer = setTimeout(() => {
            removeLastSnackbarItem();
        }, 1000);

        return () => clearTimeout(timer);*/
    }, [SnackbarContext]);

    /* Renderer */
    return (
        <SnackbarWrapper>
            {/*props.snackbarItemsGetter.map((item, index): ReactNode => {
                return (
                    <SnackbarItem key={item.message + index}>
                        <img src='/images/icon-notification-xp.png' width={32} height={32} />
                        <p>{item.message}</p>
                    </SnackbarItem>
                )
            })*/}
        </SnackbarWrapper>
    )
}