import React, { ReactNode, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";

const sidenavItems = ["Home", "Shop", "Bank", "Skills"];

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
  line-height: 1;
  cursor: pointer;
  position: relative;
  padding: 1.2rem 2rem;
  border-radius: 0.3rem;
  padding-bottom: 1.2rem;

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
  padding: 1.2rem;
  position: relative;
  align-items: center;
  margin-bottom: 1.2rem;

  h3 {
    margin-bottom: 0;
    margin-left: 1.2rem;
  }
`;

type SidebarTypes = {
  activeSidebarItemGetter: number;
  activeSidebarItemSetter: React.Dispatch<SetStateAction<number>>;
};

export const Sidebar = (props: SidebarTypes) => {
  return (
    <SidebarWapper>
      <TopBar>
        <img src="/images/logo.png" width={24} height={24} />
        <h3>UIGame</h3>
      </TopBar>
      <ul>
        {sidenavItems.map((item, index): ReactNode => {
          const isActive = props.activeSidebarItemGetter === index;

          return (
            <SidebarListItem
              id={item}
              key={item}
              onClick={() => {
                props.activeSidebarItemSetter(index);
              }}
              className={isActive ? "active" : ""}
            >
              {item}
            </SidebarListItem>
          );
        })}
      </ul>
      <BottomBar>
        <span>Version 1.0</span>
      </BottomBar>
    </SidebarWapper>
  );
};
