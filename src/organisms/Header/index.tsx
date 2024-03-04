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
  font-size: 30px;
  font-weight: 700;
  margin-top: 7px;
  margin-left: 12px;
`;

const HeaderLogin = styled.img`
  font-family: "Pretendard";
  width: 130px;
  margin-right: 30px;
`;

const HeaderTextIcon = styled.div`
  display: flex;
  align-items: center;
`;

const Header = ({ Headername }: any) => {
  return (
    <header>
      <HeaderContainer>
        <HeaderTextIcon>
          <Icon.BookmarkCheck
            size={"30px"}
            style={{
              marginLeft: "309px",
              marginRight: "12px",
            }}
          />
          <HeaderTest>{Headername}</HeaderTest>
        </HeaderTextIcon>
        <HeaderLogin
          onClick={() =>
            signOut({ redirect: true, callbackUrl: "/auth/Login" })
          }
          src="Icon/Todoit/TodoitLogo.png"
          alt="TodotIt 로고"
        ></HeaderLogin>
      </HeaderContainer>
    </header>
  );
};

export default Header;
