import styled from "styled-components";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { SkillsContainer } from "@/components/skillsContainer";


const MainContentWrapper = styled.div`
    top: 0;
    right: 0;
    height: 100vh;
    position: fixed;
    background: white;
    width: calc(100vw - 20rem);
`;

export default function Main() {
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);

  useEffect(() => {
    console.log(activeSidebarItem)
  }, [activeSidebarItem])

  return (
    <div>
      <Sidebar
        activeSidebarItemSetter={setActiveSidebarItem}
      ></Sidebar>
      <MainContentWrapper>
        {activeSidebarItem === 0 ? (
          <h1>Welcome to game, game good!</h1>
        ): null}

        {activeSidebarItem === 1 ? (
          <h1>Welcome to the Candy Shop!</h1>
        ): null}

        {activeSidebarItem === 2 ? (
          <SkillsContainer></SkillsContainer>
        ): null}
      </MainContentWrapper>
    </div>
  )
}
