import styled from "styled-components";
import * as Icon from "react-bootstrap-icons";
import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const HeaderContainer = styled.div`
  width: 80vw;
  height: 110px;
  border-bottom: solid 0.02px #c8c5cb;
  display: flex;
  align-items: center;
`;

const HeaderTest = styled.h3`
  font-family: "Pretendard";
  font-size: 30px;
  font-weight: 700;
  margin-top: 7px;
  margin-left: 12px;
`;

const HeaderLogin = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  margin-left: 741px;
`;
const HeaderSignUp = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  margin-left: 14px;
`;

const Header = ({ Headername }: any) => {
  return (
    <header>
      <HeaderContainer>
        <Icon.BookmarkCheck
          size={"30px"}
          style={{
            marginLeft: "39px",
            marginRight: "12px",
          }}
        />
        <HeaderTest>{Headername}</HeaderTest>
        <HeaderLogin
          onClick={() =>
            signOut({ redirect: true, callbackUrl: "/auth/signin" })
          }
        >
          로그아웃
        </HeaderLogin>
      </HeaderContainer>
    </header>
  );
};

export default Header;
