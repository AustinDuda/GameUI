/* Imports */
import styled from 'styled-components';
import useApiPost from '@/hooks/useApiPost';
import useApiGet from '@/hooks/useApiGet';
import { PLAYERDATATYPES } from '@/configs/enums';
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


const stats = [
    {name:'woodcutting', xp: 1000},
    {name:'mining', xp: 0},
    {name:'fishing', xp: 0},
  ]

/* Component */
export const SkillsContainer = (props: SkillsContainerTypes) => {
    const [activeCard, setActiveCard] = useState('');
    const [playerSkillData, setPlayerSkillData] = useState(stats);

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
