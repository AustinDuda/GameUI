import { useState } from 'react';
import styled from 'styled-components';
import React, { ReactNode } from 'react';
import { ActionCard } from "@/components/actionCard"

const skills = [
    {
        "id": 1,
        "title": "Woodcutting"
    },
    {
        "id": 2,
        "title": "Mining"
    },
    {
        "id": 3,
        "title": "Fishing"
    }
];

const SkillsItemList = styled.div`
    display: grid;
    column-gap: 1.2rem;
    grid-template-columns: 1fr 1fr 1fr;
`;

type SkillsContainerTypes = {
    className: string,
};

export const SkillsContainer = (props: SkillsContainerTypes) => {
    const [activeCard, setActiveCard] = useState(-1);

    return (
        <div className={props.className}>
            <h1>Skills</h1>
            <SkillsItemList>
                
                {skills.map((skill): ReactNode => {
                    return (
                        <ActionCard 
                            id={skill.id}
                            key={skill.id}
                            title={skill.title}
                            isActive={activeCard === skill.id ? true : false}
                            activeCardSetter={setActiveCard}
                        ></ActionCard>
                    )
                })}
            </SkillsItemList>
        </div>
    )
}
