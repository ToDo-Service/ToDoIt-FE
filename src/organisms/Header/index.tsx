import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { signOut } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { SidebarLayout } from "@/reocoil";
import { useEffect } from "react";

const HeaderContainer = styled.div<{
  open: boolean | null;
  nullCheck: boolean | null;
}>`
  width: calc(100vw - 230px);
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;

  animation: 0.7s
    ${(prop) =>
      prop.open !== null && prop.open ? "PopUpHeader" : "PopOutHeader"}
    forwards;
  z-index: 2;
  @keyframes PopUpHeader {
    0% {
      transform: translate(-10%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutHeader {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-10%, 0);
    }
  }
`;

const HeaderTest = styled.h3`
  font-family: "Pretendard";
  font-size: 24px;
  margin-top: 7px;
  margin-left: 12px;
  font-weight: 500;
`;

const HeaderLogin = styled.div`
  width: 130px;
  cursor: pointer;
`;

const HeaderTextIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 43px;
  width: max-content;
`;

interface Props {
  title: string;
  icon: string;
}

const Header = ({ title, icon }: Props) => {
  const SToogleState = useRecoilValue(SidebarLayout);
  const setSToogleState = useSetRecoilState(SidebarLayout);

  // useEffect(() => {
  //   setSToogleState({
  //     sidebartoggle: SToogleState.sidebartoggle,
  //     HeaderAnimaion:
  //       SToogleState.HeaderAnimaion === null
  //         ? null
  //         : SToogleState.sidebartoggle,
  //   });
  // }, [SToogleState.sidebartoggle]);
  // console.log(SToogleState.HeaderAnimaion);

  return (
    <header>
      <HeaderContainer
        open={SToogleState.sidebartoggle}
        nullCheck={SToogleState.HeaderAnimaion}
      >
        <HeaderTextIcon>
          {icon === "BookMarkCheck" && <Icon.BookmarkCheck size={"30px"} />}
          {icon === "CalendarEvent" && <Icon.CalendarEvent size={"30px"} />}
          <HeaderTest>{title}</HeaderTest>
        </HeaderTextIcon>
        <HeaderLogin
          onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
        >
          로그아웃
        </HeaderLogin>
      </HeaderContainer>
    </header>
  );
};

export default Header;
