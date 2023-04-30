import styled from "styled-components";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Snackbar } from "@/components/snackbar";
import { ShopContainer } from "@/components/shopContainer";
import { SkillsContainer } from "@/components/skillsContainer";
import { BankContainer } from "@/components/bankContainer";


const MainContentWrapper = styled.div`
    top: 0;
    right: 0;
    height: 100vh;
    padding: 2rem;
    position: fixed;
    width: calc(100vw - 24rem);

    .hide {
      display: none;
    }
`;

type SnackbarItemTypes = {
  message: string
}


export default function Main() {
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [activeSnackbarItems, setActiveSnackbarItems] = useState(Array<SnackbarItemTypes>);

  return (
    <div>
      <Sidebar
        activeSidebarItemGetter={activeSidebarItem}
        activeSidebarItemSetter={setActiveSidebarItem}
      ></Sidebar>
      <MainContentWrapper>
        {activeSidebarItem === 0 ? (
          <h1>Welcome to a most good game!</h1>
        ): null}

        {activeSidebarItem === 1 ? (
          <ShopContainer></ShopContainer>
        ): null}

        {activeSidebarItem === 2 ? (
          <BankContainer></BankContainer>
        ): null}

        <SkillsContainer 
          snackbarItemsSetter={setActiveSnackbarItems}
          className={activeSidebarItem === 3 ? '' : 'hide'}
        ></SkillsContainer>
      </MainContentWrapper>
      <Snackbar 
        snackbarItemsGetter={activeSnackbarItems}
        snackbarItemsSetter={setActiveSnackbarItems}
      ></Snackbar>
    </div>
  )
}
