/* Imports */
import { CardTimer } from './cardTimer';
import styled from 'styled-components';
import React, { useState, useEffect, useRef, SetStateAction } from 'react';


/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    text-align: left;
    background: white;
    border-radius: 1.2rem;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);
`;

const ActiveIndicator = styled.div`
    width: 1.2rem;
    height: 1.2rem;
    background: green;
    margin-left: 1rem;
    display: inline-block;
    border-radius: 0.6rem;
`;


/* Setting types */
type SkillDataTypes = {
    name: string;
    xp: number;
}

type ActionCardTypes = {
    xp: number,
    name: string,
    index: number,
    isActive: boolean,
    skillDataGetter:  Array<SkillDataTypes>
    activeCardSetter: React.Dispatch<SetStateAction<string>>
    skillDataSetter: React.Dispatch<SetStateAction<Array<SkillDataTypes>>>
};


/* Component */
export const ActionCard = (props: ActionCardTypes) => {
    const timeToCompleteAction = 4;
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout>();


    /* onclick toggles or untoggles the active card */
    const onClickSetActives = (id: string): void => {
        props.isActive
            ? props.activeCardSetter('')
            : props.activeCardSetter(id);
    }

    /* Sets visual level based on total XP */
    useEffect(() => {
        if (props.xp >= (level/0.3)**2.5) {
            setLevel(prevLevel => prevLevel + 1);
        }
    }, [level, props])


    /* Updates skill XP and resets data at parent when the action has finished */
    useEffect(() => {
        if (tick > timeToCompleteAction) {
            const newSkillDataWithUpdatedXp =  props.skillDataGetter.map((object, index) => {
                if (index === props.index) object.xp = object.xp + 10;
                return object;
            });

            props.skillDataSetter(newSkillDataWithUpdatedXp)
            setTick(0);
        }
    }, [tick, props])


    /* Handles the tick feature */
    useEffect(() => {
        if (props.isActive) {
            intervalRef.current = setInterval(() => {
                setTick(prevTick => prevTick + 1);
            }, 100)
        } else { 
            clearInterval(intervalRef.current);
            setTick(0);
        }
    }, [props.isActive]);


    /* Renderer */
    return (
        <Card onClick={() => onClickSetActives(props.name)}>
            <h3>{props.name}
            {props.isActive ? (
                <ActiveIndicator></ActiveIndicator>
            ): null}</h3>
            Current XP: {props.xp} <br />
            Current Level: {level}
            <CardTimer 
                progress={tick} 
                total={timeToCompleteAction}
            ></CardTimer>
        </Card>
    )
}
