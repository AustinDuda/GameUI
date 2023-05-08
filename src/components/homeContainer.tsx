/* Imports */
import styled from 'styled-components';
import useApiPost from '@/hooks/useApiPost';
import useApiGet from '@/hooks/useApiGet';
import { SkillCard } from "@/components/skillCard";
import { skillData } from '../../public/config/gameData';
import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';


/* Setting styles */
const ImageWrapper = styled.div`
    position: relative;

    &:before {
        content: '';
        left: 0;
        bottom: 0;
        width: 100%;
        opacity: 0.5;
        height: 54rem;
        position: absolute;
        background: linear-gradient(0deg, #1a2035 15%, transparent);
    }
`;

const ContentWrapper = styled.div`
    width: 100%;
    display: flex;
    padding: 0 3.2rem;
    align-items: flex-end;
    justify-content: space-between;
`;


const TabWrapper = styled.div`
    width: 100%;

    > h1 {
        margin-bottom: 0;
    }

    > p {
        color: #4ea752;
        text-align: center;
    }
`;

const ThreeColumnGrid = styled.div`
  display: flex;
  margin-top: 6.4rem;
  justify-content: space-evenly;

  div {
    max-width: 20%;
    text-align: center;
  }
`;


/* Component */
export const HomeContainer = () => {


    
    /* Renderer */
    return (
        <TabWrapper>
            <h1>Welcome Adventurer!</h1>
            <p>To a UI based game experience.</p>

            <ContentWrapper>
                <ImageWrapper>
                    <img src='/images/hero-m.png' width={320} />
                </ImageWrapper>
                
                <ImageWrapper>
                    <img src='/images/hero-f.png' width={280} />
                </ImageWrapper>
            </ContentWrapper>

            <ThreeColumnGrid>
                <div>
                    <h2>Grind.</h2>
                    <p>Sed ut perspiciatis unde omnis iste natus error</p>
                </div>
                <div>
                    <h2>Fight.</h2>
                    <p>velit esse cillum dolore eu fugiat nulla pariatur</p>
                </div>
                <div>
                    <h2>Collect.</h2>
                    <p>Duis aute irure dolor in reprehenderit in voluptate</p>
                </div>

            </ThreeColumnGrid>
            
            
        </TabWrapper>
    )
}
