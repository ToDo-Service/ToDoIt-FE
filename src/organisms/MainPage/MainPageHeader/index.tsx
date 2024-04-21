import styled from "styled-components";

const MainPageHeaderMainbox = styled.div`
  width: 100vw;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
  margin-bottom: 5vh;
`;

const MainPageNav = styled.nav`
  display: flex;
  align-items: center;
`;

const MainPageNavUl = styled.ul`
  list-style: none;
  display: flex;
  margin-bottom: 0;
  margin-top: 0;
  align-items: center;
  height: 38px;
`;
const MainPageNavli = styled.li`
  font-family: "PretendardVariable";
  font-weight: 350;
  font-size: 20px;
  width: 3vw;
  color: rgba(0, 0, 0, 0.5);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:not(:last-child):hover {
    background-color: rgba(12, 0, 24, 0.1);
    border-radius: 8px;
    cursor: pointer;
  }
`;

const MainPageLogo = styled.img`
  width: 85px;
  height: 20px;
`;
const MainPageFavionLogo = styled.img`
  width: 32px;
  height: 32px;
`;
const MainPageBodyStartButton = styled.a`
  text-decoration: none;
  width: 100px;
  height: 36px;
  background-color: #9550ea;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  transition: 0.5s ease-in-out;

  &:hover {
    background-color: #6c39a9;
  }

  & span {
    font-family: "PretendardVariable";
    font-weight: 350;
    color: white;
    font-size: 20px;
  }
`;

const MainPageHeader = () => {
  return (
    <MainPageHeaderMainbox>
      <div
        style={{
          width: "128px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <MainPageFavionLogo src="/Icon/Todoit/TodoitLogofavion.png" />
        <MainPageLogo src="/Icon/Todoit/TodoitLogo.png" />
      </div>
      <MainPageNav>
        <MainPageNavUl>
          <MainPageNavli>기능</MainPageNavli>
          <MainPageNavli>|</MainPageNavli>
        </MainPageNavUl>
        {/* <span></span> */}
        <MainPageBodyStartButton href="/auth/Login">
          <span>시작하기</span>
        </MainPageBodyStartButton>
      </MainPageNav>
    </MainPageHeaderMainbox>
  );
};

export default MainPageHeader;
