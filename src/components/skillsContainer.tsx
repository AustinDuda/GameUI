/* Imports */
import styled from 'styled-components';
import useApiPost from '@/hooks/useApiPost';
import useApiGet from '@/hooks/useApiGet';
import { SkillCard } from "@/components/skillCard";
import { skillData } from '../../public/config/gameData';
import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';


/* Setting styles */
const SkillsItemList = styled.div`
    display: grid;
    column-gap: 2.4rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;


/* Setting types */
type PlayerSkillDataTypes = {
    name: string;
    xp: number;
}

type SnackbarItemTypes = {
    message: string
}

type SkillsContainerTypes = {
    className: string;
    snackbarItemsSetter: React.Dispatch<SetStateAction<Array<SnackbarItemTypes>>>
};


/* Component */
export const SkillsContainer = (props: SkillsContainerTypes) => {
    const [activeCard, setActiveCard] = useState('');
    const { postData } = useApiPost('/api/playerData');
    const { getData } = useApiGet('/api/playerData', 'stats');
    const [playerSkillData, setPlayerSkillData] = useState<PlayerSkillDataTypes[]>([]);


    /* Fetches player skill data from the playerData API */
    useEffect(() => {
        if (getData === null) return;
        setPlayerSkillData(getData)
    }, [getData]);


    /* Posts player skill data to the playerData API */
    useEffect(() => {
        if (playerSkillData.length < 1) return;
        postData(playerSkillData, 'stats');
    }, [playerSkillData]);


    /* Renderer */
    return (
        <div className={props.className}>
            <h1>Skills</h1>
            <SkillsItemList>
                {playerSkillData?.map((skill, index): ReactNode => {
                    return (
                        <SkillCard 
                            index={index}
                            xp={skill.xp}
                            key={skill.name}
                            name={skill.name}
                            activeCardSetter={setActiveCard}
                            playerSkillDataGetter={playerSkillData}
                            playerSkillDataSetter={setPlayerSkillData}
                            snackbarItemsSetter={props.snackbarItemsSetter}
                            skillData={skillData[(skill.name).toLowerCase()]}
                            isActive={activeCard === skill.name ? true : false}
                        ></SkillCard>
                    )
                })}
            </SkillsItemList>
        </div>
    )
}
