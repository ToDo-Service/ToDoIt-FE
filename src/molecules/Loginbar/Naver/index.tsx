import NaverLoginBtn from "@/atoms/LOGIN/NaverLogin";
import styled from "styled-components";
import { onSocialLogin } from "@/hooks/onSocialLogin";
import { media } from "@/styles/media";

const NaverLoginBar = styled.button`
  width: 300px;
  height: 45px;
  background-color: #06c755;
  border-radius: 6px;
  display: flex;
  align-items: center;

  border: none;
  padding-left: 14px;

  & span {
    margin-left: 30px;
    color: white;
  }

  &:hover {
    background-color: #039a42;
  }
  ${media.phone`
  width: 250px;  
 `}
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
