
import styled from "styled-components";
import { useRouter } from 'next/router';
import { Sidebar } from "@/components/sidebar";
import { useAuth } from "@/context/authContext";
import { Snackbar } from "@/components/snackbar";
import React, { useState, useEffect } from "react";
import { ShopContainer } from "@/components/shopContainer";
import { BankContainer } from "@/components/bankContainer";
import { HomeContainer } from "@/components/homeContainer";
import { EventsContainer } from "@/components/EventsContainer";
import { SkillsContainer } from "@/components/skillsContainer";


const MainContentWrapper = styled.div`
    top: 0;
    right: 0;
    height: 100vh;
    position: fixed;
    width: calc(100vw - 24rem);
    padding: 6.4rem 2rem 2rem 2rem;

    .hide {
      display: none;
    }
`;

type SnackbarItemTypes = {
  message: string
}


export default function Game() {
  const [activeSidebarItem, setActiveSidebarItem] = useState(0);
  const [activeSnackbarItems, setActiveSnackbarItems] = useState(Array<SnackbarItemTypes>);
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [router, user])

  return (
    <>
      {user ? (
        <div>
          <Sidebar
            activeSidebarItemGetter={activeSidebarItem}
            activeSidebarItemSetter={setActiveSidebarItem}
          ></Sidebar>
          <MainContentWrapper>
            {activeSidebarItem === 0 ? (
              <HomeContainer></HomeContainer>
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

            {activeSidebarItem === 4 ? (
              <EventsContainer></EventsContainer>
            ): null}
            
          </MainContentWrapper>
          <Snackbar 
            snackbarItemsGetter={activeSnackbarItems}
            snackbarItemsSetter={setActiveSnackbarItems}
          ></Snackbar>
        </div>
      ): null}
    </>
  )
}

