import styled from 'styled-components';
import { ActionCard } from "@/components/actionCard";
import React, { ReactNode, useEffect, useState } from 'react';

const SkillsItemList = styled.div`
    display: grid;
    column-gap: 1.2rem;
    grid-template-columns: 1fr 1fr 1fr;
`;

type SkillsContainerTypes = {
    className: string,
};

type SkillDataTypes = {
    name: string;
    xp: number;
}

export const SkillsContainer = (props: SkillsContainerTypes) => {

    const [activeCard, setActiveCard] = useState('');
    const [skillsData, setSkillData] = useState<SkillDataTypes[]>([]);
    
    const fetchSkillData = async () => {
        const response = await fetch("/api/skills");
    
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setSkillData(data.skills);
    };

    useEffect(() => {
        fetchSkillData();
    }, []);

    return (
        <div className={props.className}>
            <h1>Skills</h1>
            <SkillsItemList>
                {skillsData.map((skill, index): ReactNode => {
                    return (
                        <ActionCard 
                            index={index}
                            xp={skill.xp}
                            id={skill.name}
                            key={skill.name}
                            name={skill.name}
                            skillDataGetter={skillsData}
                            skillDataSetter={setSkillData}
                            activeCardSetter={setActiveCard}
                            isActive={activeCard === skill.name ? true : false}
                        ></ActionCard>
                    )
                })}
            </SkillsItemList>
        </div>
    )
}
