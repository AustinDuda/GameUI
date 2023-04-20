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


export const SkillsContainer = () => {
    const [activeCard, setActiveCard] = useState(-1);

    return (
        <div>
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
        </div>
    )
}
