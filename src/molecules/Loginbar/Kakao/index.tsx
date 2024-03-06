import KakaoLoginBtn from "@/atoms/LOGIN/KakaoLoginBtn";
import styled from "styled-components";
import { onSocialLogin } from "@/hooks/onSocialLogin";
import { FC } from "react";

const KakaoLoginBar = styled.button`
  width: 300px;
  height: 45px;
  background-color: #fee500;
  border-radius: 6px;
  display: flex;
  align-items: center;
  border: none;
  padding-left: 14px;
  & span {
    margin-left: 30px;
  }
  margin-bottom: 14px;

  &:hover {
    background-color: #dcc602;
  }
`;

const Kakao: FC = () => {
  return (
    <KakaoLoginBar onClick={(e) => onSocialLogin(e, "kakao")}>
      <KakaoLoginBtn />
      <span>카카오 계정으로 로그인</span>
    </KakaoLoginBar>
  );
};

export default Kakao;
