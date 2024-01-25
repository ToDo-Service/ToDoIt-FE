import Kakao from "@/molecules/Loginbar/Kakao";
import Naver from "@/molecules/Loginbar/Naver";
import Google from "@/molecules/Loginbar/Google";
import styled from "styled-components";
import { stripTypename } from "@apollo/client/utilities";

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
`;

const Login = () => {
  return (
    <LoginContainer>
      <LoginModalContainer>
        <Kakao />
        <Google />
        <Naver />
      </LoginModalContainer>
    </LoginContainer>
  );
};

export default Login;
