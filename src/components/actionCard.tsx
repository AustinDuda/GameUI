import { CardTimer } from './cardTimer';
import styled from 'styled-components';
import React, { useState, useEffect, useRef, useCallback, MouseEventHandler, SetStateAction } from 'react';

type ActionCardTypes = {
    id: number,
    title: string,
    isActive: boolean,
    activeCardSetter: React.Dispatch<SetStateAction<number>>
};

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

export const ActionCard = (props: ActionCardTypes) => {
    const baseXpToNextLevel = 80;
    const timeToCompleteAction = 4;
    const [xp, setXp] = useState(0);
    const toNextLevelModifier = 1.15;
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout>();

    const onClickSetActives = (id: number): void => {
        props.isActive
            ? props.activeCardSetter(-1)
            : props.activeCardSetter(id);
    }

    useEffect(() => {
        if (tick > timeToCompleteAction) {
            setXp(prevXp => prevXp + 10);
            setTick(0);
        }

        if (xp >= (level/0.3)**2.5) {
            setLevel(prevLevel => prevLevel + 1);
        }
    }, [tick, xp, level])

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

    return (
        <Card onClick={() => onClickSetActives(props.id)}>
            <h3>{props.title}
            {props.isActive ? (
                <ActiveIndicator></ActiveIndicator>
            ): null}</h3>
            Current XP: {xp} <br />
            Current Level: {level}
            <CardTimer 
                progress={tick} 
                total={timeToCompleteAction}
            ></CardTimer>
        </Card>
    )
}
