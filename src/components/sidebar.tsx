
import styled from "styled-components";

import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import { PLAYERDATATYPES } from "@/configs/enums";
import { CustomContext } from '@/context/customContext';


const sidenavItems = ["Home", "Shop", "Bank", "Skills", "Events"];

const SidebarWapper = styled.div`
  top: 0;
  left: 0;
  width: 24rem;
  height: 100vh;
  display: flex;
  position: fixed;
  padding: 0 1.2rem;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-image: url(/images/bg.png);
  box-shadow: 0.6rem 0.6rem 1.2rem rgba(0, 0, 0, 0.1);

  &:after {
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.92;
    position: absolute;
    background: #1f283e;
  }
`;

const SidebarListItem = styled.li`
  z-index: 1;
  display: flex;
  line-height: 1;
  cursor: pointer;
  position: relative;
  align-items: center;
  border-radius: 0.3rem;
  padding-bottom: 1.2rem;
  padding: 1.2rem 2rem 1.2rem 1.2rem;

  img {
    width: 2rem;
    margin-right: 0.8rem;
  }

  &.active {
    color: white;
    background: linear-gradient(60deg, #288c6c, #4ea752);
  }
`;

const BottomBar = styled.div`
  left: 0;
  bottom: 0;
  z-index: 1;
  width: 100%;
  text-align: center;
  position: absolute;
  background: #1f283e;
  padding: 0.6rem 1.2rem;
`;

const TopBar = styled.div`
  z-index: 1;
  display: flex;
  position: relative;
  align-items: center;
  padding: 2rem 1.2rem;

  h3 {
    font-size: 3rem;
    margin-bottom: 0;
    margin-left: 1.2rem;
    font-family: Staatliches;
  }
`;

const CurrencyWrapper = styled.div`
  display: flex;
  color: #d48c00;
  margin-left: auto;
  align-items: center;
  font-family: RobotoBold;

  .active & {
    color: white;
  }
`;

type SidebarTypes = {
  activeSidebarItemGetter: number;
  activeSidebarItemSetter: React.Dispatch<SetStateAction<number>>;
};

export const Sidebar = (props: SidebarTypes) => {
  const { PlayerGoldContext } = React.useContext(CustomContext);

  return (
    <SidebarWapper>
      <TopBar>
        <img src="/images/logo.png" width={36} height={36} />
        <h3>Brimthrone</h3>
      </TopBar>
      <ul>
        {sidenavItems.map((item, index): ReactNode => {
          const isActive = props.activeSidebarItemGetter === index;
          const showGold = item === 'Shop' ?  PlayerGoldContext.gold : false;
          return (
            <SidebarListItem
              id={item}
              key={item}
              onClick={() => {
                props.activeSidebarItemSetter(index);
              }}
              className={isActive ? "active" : ""}
            >
              <img src={`/images/icon-${(item).toLowerCase()}.svg`} />
              {item} 
              {showGold ? <CurrencyWrapper><img src="/images/icon-gold-coin.png" width={24} height={24} />{showGold}</CurrencyWrapper> : null}
            </SidebarListItem>
          );
        })}
      </ul>
      <BottomBar>
        <span>Version 1.01.1</span>
      </BottomBar>
    </SidebarWapper>
  );
};
