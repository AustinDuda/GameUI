/* Imports */
import styled from 'styled-components';
import { CardTimer } from './cardTimer';
import { Select } from './select';
import { skillData } from '../../public/config/gameData';
import React, { useState, useEffect, useRef, SetStateAction } from 'react';

/* Setting styles */
const Card = styled.div`
  text-align: left;
  margin-top: 3.2rem;
  background: #202940;
  border-radius: 0.6rem;
  font-family: RobotoLight;
  padding: 0 2.4rem 2.4rem 2.4rem;
  box-shadow: 0.1rem 0.1rem 0.1rem rgba(0, 0, 0, 0.1);

  img {
    border-radius: 3.2rem;
    border: 0.2rem solid white;
    margin: -3.2rem auto 1.2rem auto;
  }
`;

const CardTitle = styled.h3`
  text-align: center;
  font-family: RobotoBold;
`;

const CardXpProgressBar = styled.div`
    width: 100%;
    height: 1.2rem;
    position: relative;
    background: #1a2035;
    border-radius: 0.2rem;
    margin-bottom: 2.4rem;

    &:before {
        content: '';
        top: 0;
        lefT: 0;
        width: 7%;
        height: 100%;
        position: absolute;
        border-radius: 0.2rem;
        background: linear-gradient(60deg,#f5700c,#ff9800);
    }
`;

const ActiveButton = styled.button`
    color: white;
    border-radius: 0.4rem;
    padding: 0.4rem 1.2rem;
    font-family: RobotoBold;
    background: linear-gradient(60deg, #288c6c, #4ea752);
`;

/* Setting types */
type SkillDataTypes = {
  name: string;
  xp: number;
};

type SnackbarItemTypes = {
  message: string;
};

type ActionCardTypes = {
  xp: number;
  name: string;
  index: number;
  isActive: boolean;
  skillDataGetter: Array<SkillDataTypes>;
  activeCardSetter: React.Dispatch<SetStateAction<string>>;
  skillDataSetter: React.Dispatch<SetStateAction<Array<SkillDataTypes>>>;
  snackbarItemsSetter: React.Dispatch<SetStateAction<Array<SnackbarItemTypes>>>;
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
            <img src={`/images/icon-${props.name}.png`} height='64' width='64' alt='' />
            <CardTitle>{props.name}</CardTitle>

            <CardXpProgressBar></CardXpProgressBar>
            <p>{props.xp}/1000xp</p>

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


