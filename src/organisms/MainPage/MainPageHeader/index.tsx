import styled from "styled-components";

const MainPageHeaderMainbox = styled.div`
  width: 100vw;
  height: 72px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  margin-bottom: 5vh;
`;

const MainPageNav = styled.nav`
  display: flex;
`;

const MainPageNavUl = styled.ul`
  list-style: none;
`;
const MainPageNavli = styled.li``;

const MainPageLogo = styled.img`
  width: 128px;
  height: 32px;
`;

const MainPageHeader = () => {
  return (
    <MainPageHeaderMainbox>
      <MainPageLogo src="/Icon/Todoit/TodoitLogo.png" />
      <MainPageNav>
        <MainPageNavUl>
          <MainPageNavli></MainPageNavli>
        </MainPageNavUl>
      </MainPageNav>
    </MainPageHeaderMainbox>
  );
};

export default MainPageHeader;
