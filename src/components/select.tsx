import styled from 'styled-components';
import { CustomContext } from '@/context/customContext';
import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';


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
    background: #1a2035;
    align-items: center;
    border-radius: 0.4rem;
    padding: 0.8rem 1.2rem;
    
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
    max-height: 0;
    overflow: hidden;
    background: white;
    position: absolute;
    flex-direction: column;
    transition: all 0.25s ease-in-out;

    &.open {
        max-height: 30rem;
    }
`;

const Option = styled.button<{disabled: boolean}>`
    opacity: ${props => props.disabled ? 0.5 : 1};
`;

type ActionTypes = {
    xp: number,
    name: string,
    drops: string,
    levelReq: number,
}

type SelectTypes = {
    currentLevel: number;
    options: Array<ActionTypes>;
    selectActionSetter: React.Dispatch<SetStateAction<string>>
};

export const Select = (props: SelectTypes) => {
    const [selectOpen, setSelectOpen] = useState(false);
    const selectRef = React.useRef<HTMLDivElement>(null);
    const [selectedValue, setSelectedValue] = useState('');
    const { PlayerSkillsContext } = useContext(CustomContext);
    

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
        setSelectOpen(false)
        setSelectedValue(name);
        props.selectActionSetter(name);
    }

    return (
        <SelectWrapper ref={selectRef}>
            <p>Select Action:</p>
            <Selection 
                onClick={() => { setSelectOpen(prevState => !prevState) }}>
                {selectedValue != '' ? selectedValue : 'Select'}
                <span></span>
            </Selection>
            <OptionsWarpper className={selectOpen === true ? 'open' : ''}>
                {props.options.map((option, index) => {
                    return (
                        <Option
                            key={option.name + index}
                            onClick={() => { handleSelectOption(option.name) }}
                            disabled={props.currentLevel < option.levelReq ? true : false}
                        >{option.name}</Option>
                    )
                })}
            </OptionsWarpper>
        </SelectWrapper>
    )
}
