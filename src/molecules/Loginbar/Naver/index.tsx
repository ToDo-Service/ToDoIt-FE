import NaverLoginBtn from "@/atoms/LOGIN/NaverLogin";
import styled from "styled-components";
import { onSocialLogin } from "@/hooks/onSocialLogin";

const NaverLoginBar = styled.div`
  width: 300px;
  height: 45px;
  background-color: #06c755;
  border-radius: 6px;
  display: flex;
  align-items: center;
  color: white;
  padding-left: 14px;
  & span {
    margin-left: 30px;
  }
`;

const Naver = () => {
  return (
    <NaverLoginBar onClick={(e) => onSocialLogin(e, "naver")}>
      <NaverLoginBtn />
      <span>네이버 계정으로 로그인</span>
    </NaverLoginBar>
  );
};

export default Naver;
