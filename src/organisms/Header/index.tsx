import styled from "styled-components";

const HeaderContainer = styled.div`
  width: 80vw;
  height: 13vh;
  border-bottom: solid 0.02px #c8c5cb;
  display: flex;
  align-items: center;
`;

const HeaderTest = styled.h3`
  font-family: "Pretendard";
  font-size: 30px;
  margin-left: 81px;
  font-weight: 700;
`;

const HeaderLogin = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  margin-left: 49vw;
`;
const HeaderSignUp = styled.p`
  font-family: "Pretendard";
  font-size: 16px;
  margin-left: 14px;
`;

const Header = ({ Headername }: any) => {
  console.log(Headername);
  return (
    <header>
      <HeaderContainer>
        <HeaderTest>{Headername}</HeaderTest>
        <HeaderLogin>로그인</HeaderLogin>
        <HeaderSignUp>회원가입</HeaderSignUp>
      </HeaderContainer>
    </header>
  );
};

export default Header;
