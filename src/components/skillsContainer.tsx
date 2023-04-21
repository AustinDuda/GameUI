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

export const SkillsContainer = (props: SkillsContainerTypes) => {
    const [skillsData, setSkillData] = useState({empty: {xp: 0}});
    const [activeCard, setActiveCard] = useState('');
    
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
                {Object.keys(skillsData).map((key, index): ReactNode => {
                    return (
                        <ActionCard 
                            xp={skillsData[key].xp}
                            id={key}
                            key={key}
                            title={key}
                            skillDataSetter={setSkillData}
                            activeCardSetter={setActiveCard}
                            isActive={activeCard === key ? true : false}
                        ></ActionCard>
                    )
                })}
            </SkillsItemList>
        </div>
    )
}
