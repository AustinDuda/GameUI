import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Selection = styled.button`
    border-radius: 0.3rem;
    padding: 0.4rem 1.2rem;
    border: 0.1rem solid grey;
`;

type ActionTypes = {
    xp: number,
    name: string,
    drops: string,
    levelReq: number,
}

type SelectTypes = {
    options: Array<ActionTypes>;
    selectActionSetter: React.Dispatch<SetStateAction<string>>
};

export const Select = (props: SelectTypes) => {
    const [selectOpen, setSelectOpen] = useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);
    const [selectedValue, setSelectedValue] = useState('');

    /* */
    useEffect(() => {
        window.addEventListener('click', handleOnClickEvent);

        return () => {
            window.removeEventListener('click', handleOnClickEvent);
        };
    });

    /* */
    const handleOnClickEvent = (e: any) => {
        if(selectRef.current && selectOpen && !selectRef.current.contains(e.target)){
            setSelectOpen(false)
          }
    }

    /* */
    const handleSelectOption = (name: string) => {
        setSelectedValue(name);
        props.selectActionSetter(name);
    }

    return (
        <SelectWrapper ref={selectRef}>
            <Selection onClick={() => { setSelectOpen(prevState => !prevState) }}>{selectedValue != '' ? selectedValue : 'Select'}</Selection>
            {selectOpen ? (
                props.options.map((option, index) => {
                    return (
                        <button 
                            key={option.name + index}
                            onClick={() => { handleSelectOption(option.name) }}
                        >{option.name}</button>
                    )
                })
            ):null}
        </SelectWrapper>
    )
}
