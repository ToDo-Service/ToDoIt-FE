import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 80vw;
  height: 13vh;
  border-bottom: solid 0.02px #c8c5cb;
`;

const Header = () => {
  return (
    <header>
      <HeaderContainer>헤더입니다</HeaderContainer>
    </header>
  );
};

export default Header;
