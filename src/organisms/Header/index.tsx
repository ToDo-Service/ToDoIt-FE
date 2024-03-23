import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { signOut } from "next-auth/react";

const HeaderContainer = styled.div`
  /* padding-left: 230px; */
  width: calc(100vw - 230px);
  height: 110px;
  border-bottom: solid 0.02px #c8c5cb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  z-index: 2;
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
  return (
    <header>
      <HeaderContainer>
        <HeaderTextIcon>
          {icon === "BookMarkCheck" ? (
            <Icon.BookmarkCheck size={"30px"} />
          ) : undefined}
          {icon === "CalendarEvent" ? (
            <Icon.CalendarEvent size={"30px"} />
          ) : undefined}
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
