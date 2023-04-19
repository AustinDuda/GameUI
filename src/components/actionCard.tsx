import { CardTimer } from './cardTimer';
import React, { useState, useEffect, useRef, useCallback } from 'react';

type ActionCardTypes = {
  title: string;
};

export const ActionCard = (props: ActionCardTypes) => {

    const timeToCompleteAction = 4;
    
    const [tick, setTick] = useState(0);
    const timeTestRef = useRef(tick);
    const [xp, setXp] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout>()
    const [intervalActive, setIntervalActive] = useState(false);

    useEffect(() => {
        timeTestRef.current = tick;

        if (tick === timeToCompleteAction) {
            setXp(prevXp => prevXp + 10);
        }
    }, [tick])

    useEffect(() => {
        if (intervalActive) {
            intervalRef.current = setInterval(() => {
                const isTickGreaterThanTimeToCompleteAction = 
                    timeTestRef.current >= timeToCompleteAction ? 0 : 1;
                setTick(prevTick => (prevTick + 1) * isTickGreaterThanTimeToCompleteAction);
            }, 1000)
        } else { clearInterval(intervalRef.current) }
    }, [intervalActive]);

    return (
        <div onClick={() => setIntervalActive(!intervalActive)}>
            {intervalActive ? (
                <div>Is Active</div>
            ): null}
            {props.title} <br />
            Current XP: {xp}
            <CardTimer 
                progress={tick} 
                total={timeToCompleteAction}
            ></CardTimer>
        </div>
    )
}
