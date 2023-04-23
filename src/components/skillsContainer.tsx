import styled from 'styled-components';
import { ActionCard } from "@/components/actionCard";
import React, { ReactNode, useEffect, useState } from 'react';

const SkillsItemList = styled.div`
    display: grid;
    column-gap: 2.4rem;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

type SkillDataTypes = {
    name: string;
    xp: number;
}

type SkillsContainerTypes = {
    className: string,
};

export const SkillsContainer = (props: SkillsContainerTypes) => {

    const [activeCard, setActiveCard] = useState('');
    const [skillsData, setSkillData] = useState<SkillDataTypes[]>([]);
    
    useEffect(() => {
        const fetchSkillData = async () => {
            const response = await fetch("/api/skills");
        
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json();
            setSkillData(data.skills);
        };
        fetchSkillData();
    }, []);

    useEffect(() => {
        const postSkillData = async () => {
            if (skillsData.length < 1) return;
            const response = await fetch("/api/skills", {
                method: 'POST',
                body: JSON.stringify(skillsData),
                headers: {
                    'Content-type':  'application-json'
                }
            });
        
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json();
        };

        postSkillData();
    }, [skillsData]);

    return (
        <div className={props.className}>
            <h1>Skills</h1>
            <SkillsItemList>
                {skillsData.map((skill, index): ReactNode => {
                    return (
                        <ActionCard 
                            index={index}
                            xp={skill.xp}
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
