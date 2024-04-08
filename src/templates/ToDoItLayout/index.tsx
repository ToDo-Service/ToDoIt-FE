import styled from "styled-components";

import MainPage from "@/organisms/TodoIt/TodoItMainPage";

import { useRecoilValue } from "recoil";
import { SidebarLayout } from "@/reocoil";
import { FC } from "react";
import type { TodayData } from "@/types/tb";
import { media } from "@/styles/media";

const MainLayout = styled.div<{ open: boolean | null }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  animation: 0.7s
    ${(prop) => (prop.open !== null && prop.open ? "PopUpTodo" : "PopOutTodo")}
    forwards;
  z-index: 2;

  @keyframes PopUpTodo {
    0% {
      transform: translate(-10%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutTodo {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-10%, 0);
    }
  }

  ${media.phone`      
  transition: 0.7s ease-in-out;
      opacity: ${(props: { open: null }) =>
        props.open !== null && props.open ? "0" : "1"}      
  `}
`;

const MainLayouts: FC<TodayData> = ({ Data }) => {
  const SToogleState = useRecoilValue(SidebarLayout);

  return (
    <MainLayout open={SToogleState.sidebartoggle}>
      {<MainPage Data={Data} />}
    </MainLayout>
  );
};

export default MainLayouts;
