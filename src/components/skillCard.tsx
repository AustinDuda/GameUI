/* Imports */
import { Select } from './select';
import styled from 'styled-components';
import useApiGet from '@/hooks/useApiGet';
import { ProgressBar } from './progressBar';
import useApiPost from '@/hooks/useApiPost';
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

const ActiveButton = styled.button`
    color: white;
    border-radius: 0.4rem;
    padding: 0.4rem 1.2rem;
    font-family: RobotoBold;
    background: linear-gradient(60deg, #288c6c, #4ea752);
`;


/* Setting types */
type PlayerSkillDataTypes = {
  name: string;
  xp: number;
};

type SnackbarItemTypes = {
  message: string;
};

type SkillDataTypes = {
    actions: Array<any>,
    items: Array<any>
}

type ActionCardTypes = {
  xp: number;
  name: string;
  index: number;
  isActive: boolean;
  skillData: SkillDataTypes;
  playerSkillDataGetter: Array<PlayerSkillDataTypes>;
  activeCardSetter: React.Dispatch<SetStateAction<string>>;
  snackbarItemsSetter: React.Dispatch<SetStateAction<Array<SnackbarItemTypes>>>;
  playerSkillDataSetter: React.Dispatch<SetStateAction<Array<PlayerSkillDataTypes>>>;
};


/* Component */
export const SkillCard = (props: ActionCardTypes) => {

    const timeToCompleteAction = 4;
    const [tick, setTick] = useState(0);
    const [level, setLevel] = useState(1);
    const intervalRef = useRef<NodeJS.Timeout>();
    const [xpRemainder, setXpRemainder] = useState(0);
    const { postData } = useApiPost('/api/playerData');
    const [xpToNextLevel, setXpToNextLevel] = useState(0);
    const [selectedAction, setSelectedAction] = useState('');
    


    /* onclick toggles or untoggles the active card */
    const onClickSetActives = (id: string): void => {
        props.isActive
            ? props.activeCardSetter('')
            : props.activeCardSetter(id);
    }


    /* Calculates current level in a skill from the total amount of xp in a skill */
    const calculateLevelFromXp = (): void => {
        let totalXpForLevel = 0;

        for (var i = 1; i <= 99; i++) {
            const calculateXpForNextLevel = Math.floor(i + 100 * Math.pow(2, i / 7.5));
            totalXpForLevel += calculateXpForNextLevel;

            if (props.xp < totalXpForLevel) {
                setLevel(i);
                setXpRemainder((totalXpForLevel - props.xp))

                if (totalXpForLevel != xpToNextLevel) setXpToNextLevel(calculateXpForNextLevel)
                break;
            }
        }
    }

    
    /* Sets visual level based on total XP */
    useEffect(() => {
        calculateLevelFromXp();
    }, [props.xp])


    /* Updates skill XP and resets data at parent when the action has finished */
    useEffect(() => {
        if (tick > timeToCompleteAction) {
            const newSkillDataWithUpdatedXp =  props.playerSkillDataGetter.map((object, index) => {
                if (index === props.index) object.xp = object.xp + calculateRecievedXpPerAction();
                return object;
            });


            postData({name: 'Pine log', quantity: 1}, 'bank');
            props.snackbarItemsSetter((prevState => [...prevState, {message: `You recieved ${calculateRecievedXpPerAction()}xp in ${props.name}`}]))
            props.playerSkillDataSetter(newSkillDataWithUpdatedXp);
            setTick(0);
        }
    }, [tick, props]);


    /* Handles the tick feature */
    useEffect(() => {
        if (props.isActive) {
            intervalRef.current = setInterval(() => {
                setTick(prevTick => prevTick + 1);
            }, 250)
            setTick(prevTick => prevTick + 1);
        } else {
            clearInterval(intervalRef.current);
            setTick(0);
        }
    }, [props.isActive]);


    /* Calculates xp to recieve per action complete based on selection */
    const calculateRecievedXpPerAction = () => {
        var result = props.skillData.actions.find(x => x.name === selectedAction)

        return result ? result.xp : 10;
    }

    
    /* Renderer */
    return (
        <Card>
            <img src={`/images/icon-${props.name}.png`} height='64' width='64' alt='' />
            <CardTitle>{props.name}</CardTitle>
            <ProgressBar 
                theme='primary'
                width={Math.floor(((xpToNextLevel - xpRemainder)/xpToNextLevel) * 100)}
            ></ProgressBar>
            <p>{xpToNextLevel - xpRemainder}xp/{xpToNextLevel}xp</p>

            <p>Current XP: {props.xp}</p>
            <p>Current Level: {level}/99</p>
            <p>Xp Remaining: {xpRemainder}</p>
            <p>Xp Recieved per action: {calculateRecievedXpPerAction()}</p>

            <ProgressBar 
                theme='secondary'
                width={Math.floor((tick/timeToCompleteAction) * 100)}
            ></ProgressBar>

            <Select 
                selectActionSetter={setSelectedAction}
                options={props.skillData.actions}
            ></Select>
            
            <ActiveButton onClick={() => onClickSetActives(props.name)}>Activate</ActiveButton>
        </Card>
    )
}


