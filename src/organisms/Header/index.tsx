import styled from "styled-components";
import { signOut } from "next-auth/react";
import { useRecoilValue } from "recoil";
import { SidebarLayout } from "@/reocoil";

const HeaderContainer = styled.div<{
  open: boolean | null;
  nullCheck: boolean | null;
}>`
  width: calc(100vw - 230px);

  transition: 0.7s ease-out;
  margin-left: ${(props) => (props.open ? "39px" : "0")};
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;

  animation: 0.7s
    ${(prop) =>
      prop.open !== null && prop.open ? "PopUpheader" : "PopOutheader"}
    forwards;
  z-index: 2;
  @keyframes PopUpheader {
    0% {
      transform: translate(-10%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutheader {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-10%, 0);
    }
  }
`;

const HeaderTest = styled.p`
  font-family: "Pretendard-Bold";
  font-weight: 300;
  font-size: 24px;
  margin-top: 7px;
`;

const HeaderLogin = styled.div`
  width: 130px;
  cursor: pointer;
`;

const HeaderTextIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: max-content;
`;

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const SToogleState = useRecoilValue(SidebarLayout);

  return (
    <header>
      <HeaderContainer
        open={SToogleState.sidebartoggle}
        nullCheck={SToogleState.HeaderAnimaion}
      >
        <HeaderTextIcon>
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
