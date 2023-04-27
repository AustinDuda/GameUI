import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const SelectWrapper = styled.div`
    display: flex;
    position: relative;
    margin-bottom: 2.4rem;
    flex-direction: column;
    align-items: flex-start;
    
`;

const Selection = styled.button`  
    width: 100%;
    display: flex;
    align-items: center;
    border-radius: 0.3rem;
    padding: 0.4rem 1.2rem;
    border: 0.1rem solid grey;

    span {
        margin-left: auto;

        &:before {
            content: '';
            top: -0.2rem;
            width: 0.8rem;
            height: 0.8rem;
            display: block;
            position: relative;
            transform: rotate(-45deg);
            border-left: grey solid 0.1rem;
            border-bottom: grey solid 0.1rem;
        }
    }
`;

const OptionsWarpper = styled.div`
    left: 0;
    top: 100%;
    width: 100%;
    display: flex;
    background: white;
    position: absolute;
    flex-direction: column;
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
            <Selection 
                onClick={() => { setSelectOpen(prevState => !prevState) }}>
                {selectedValue != '' ? selectedValue : 'Select'}
                <span></span>
            </Selection>
            <OptionsWarpper>
                {selectOpen ? (
                    props.options.map((option, index) => {
                        return (
                            <button 
                                key={option.name + index}
                                onClick={() => { handleSelectOption(option.name) }}
                            >{option.name}</button>
                        )
                    })
                ): null}
            </OptionsWarpper>
        </SelectWrapper>
    )
}
