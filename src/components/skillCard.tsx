/* Imports */
import styled from 'styled-components';
import { CardTimer } from './cardTimer';
import { Select } from './select';
import { skillData } from '../../public/config/gameData';
import React, { useState, useEffect, useRef, SetStateAction } from 'react';


/* Setting styles */
const Card = styled.div`
    padding: 2.4rem;
    text-align: left;
    background: #202940;
    border-radius: 0.6rem;
    font-family: RobotoLight;
    box-shadow: 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.1);

    img {
        margin-bottom: 1.2rem;
    }
`;

const CardTitle = styled.h3`
    
`;

const ActiveIndicator = styled.div`
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 1rem;
    display: inline-block;
    border-radius: 0.6rem;
    background: linear-gradient(60deg, #288c6c, #4ea752);
`;

const ActiveButton = styled.button`
    color: white;
    padding: 0.4rem 1.2rem;
    font-family: RobotoBold;
    background: linear-gradient(60deg, #288c6c, #4ea752);
`;


/* Setting types */
type SkillDataTypes = {
    name: string;
    xp: number;
}

type SnackbarItemTypes = {
    message: string
}

type ActionCardTypes = {
    xp: number,
    name: string,
    index: number,
    isActive: boolean,
    skillDataGetter:  Array<SkillDataTypes>
    activeCardSetter: React.Dispatch<SetStateAction<string>>
    skillDataSetter: React.Dispatch<SetStateAction<Array<SkillDataTypes>>>
    snackbarItemsSetter: React.Dispatch<SetStateAction<Array<SnackbarItemTypes>>>
};


/* Component */
export const SkillCard = (props: ActionCardTypes) => {
    const timeToCompleteAction = 4;
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout>();
    const [selectedAction, setSelectedAction] = useState('');

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

            props.snackbarItemsSetter((prevState => [...prevState, {message: `You recieved 10xp in ${props.name}`}]))
            props.skillDataSetter(newSkillDataWithUpdatedXp);
            setTick(0);
        }
    }, [tick, props])


    /* Handles the tick feature */
    useEffect(() => {
        if (props.isActive) {
            intervalRef.current = setInterval(() => {
                setTick(prevTick => prevTick + 1);
            }, 250)
        } else {
            clearInterval(intervalRef.current);
            setTick(0);
        }
    }, [props.isActive]);

    /* Renderer */
    return (
        <Card>
            <img src='/images/icon-skill-woodcutting.png' height='48' width='48' alt='' />
            <h3>{props.name}
            {props.isActive ? (
                <ActiveIndicator></ActiveIndicator>
            ): null}</h3>
            <p>Current XP: {props.xp}</p>
            <p>Current Level: {level}</p>
            <CardTimer 
                progress={tick} 
                total={timeToCompleteAction}
            ></CardTimer>
            <Select 
                selectActionSetter={setSelectedAction}
                options={skillData[(props.name).toLowerCase()].actions}
            ></Select>
            
            <ActiveButton onClick={() => onClickSetActives(props.name)}>Activate</ActiveButton>
        </Card>
    )
}

/*<select>
                {(skillData[(props.name).toLowerCase()].actions).map((data, index: number) => {
                    return (
                        <option key={props.name + index}>{data.name}</option>
                    )
                })}
            </select>*/
