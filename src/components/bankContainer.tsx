import React, { ReactNode, useEffect, useState } from 'react';
import { BankCard } from './bankCard';
import styled from 'styled-components';

const BankCardWrapper = styled.div`
    display: grid;
    row-gap: 2.4rem;
    column-gap: 2.4rem;
    grid-template-columns: repeat(12, 1fr);

    &:hover {
        border-color: grey;
    }
`;

export const BankContainer = () => {
    const [totalBankSlots, setTotalBankSlots] = useState(24);

    return (
        <div>
            <h1>Bank</h1>

            <BankCardWrapper>
                {[...Array(totalBankSlots).fill(0)].map((items, index): ReactNode => {
                    return (
                        <BankCard
                            key={index}
                        ></BankCard>
                    )
                })}
            </BankCardWrapper>
        </div>
    )
}
