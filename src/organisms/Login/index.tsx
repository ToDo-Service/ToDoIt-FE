import Kakao from "@/molecules/Loginbar/Kakao";
import Naver from "@/molecules/Loginbar/Naver";
import Google from "@/molecules/Loginbar/Google";
import styled from "styled-components";
import { media } from "@/styles/media";

interface User {
  id: number;
  name: string;
  jwttoken: string;
  image: string;
}

const LoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  justify-content: center;
  align-items: center;
`;

const LoginModalContainer = styled.div`
  width: 600px;
  height: 384px;
  background-color: #ffffff;
  filter: drop-shadow(3px 3px rgba(12, 0, 24, 0.1));
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${media.phone`
  width: 350px;
  height: 300px;
 `}
`;
const LoginHeader = styled.h1`
  font-size: 32px;
  font-family: "Pretendard-Bold";
  font-weight: 300;
  margin-bottom: 15px;
`;
const LoginDetailText = styled.p`
  font-size: 14px;
  color: #8c8c8c;
  font-family: "PretendardVariable";
  font-weight: 280;
  margin-bottom: 31px;
`;

// font-family: "Pretendard-Bold";
// font-family: "PretendardVariable";

const Login = () => {
  return (
    <LoginContainer>
      <LoginModalContainer>
        <LoginHeader>로그인</LoginHeader>
        <LoginDetailText>
          기존 소셜 계정으로 쉽게 로그인할 수 있어요.
        </LoginDetailText>
        <Kakao />
        <Google />
        <Naver />
      </LoginModalContainer>
    </LoginContainer>
  );
};

export default Login;
