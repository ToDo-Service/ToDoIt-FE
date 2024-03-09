import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { signOut } from "next-auth/react";

const HeaderContainer = styled.div`
  width: 100vw;
  height: 110px;
  border-bottom: solid 0.02px #c8c5cb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
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
  margin-right: 30px;
`;

const HeaderTextIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 264px;
`;

const Header = ({ Headername }: any) => {
  return (
    <header>
      <HeaderContainer>
        <HeaderTextIcon>
          <Icon.BookmarkCheck size={"30px"} />
          <HeaderTest>{Headername}</HeaderTest>
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
