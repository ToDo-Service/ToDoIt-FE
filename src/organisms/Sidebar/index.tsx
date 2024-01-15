import styled from "styled-components";

const S_Background = styled.nav`
  height: 100vh;
  width: 20.5vw;
  background-color: #f7f8f9;
  border-radius: 6px;
  filter: drop-shadow(0.5px 0.5px 0.5px #a5a4a4);
`;

const Sidebar = () => {
  return (
    <S_Background>
      <div>사이드바입니다</div>
    </S_Background>
  );
};

export default Sidebar;
