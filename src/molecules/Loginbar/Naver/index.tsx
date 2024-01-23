import NaverLoginBtn from "@/atoms/LOGIN/NaverLogin";
import styled from "styled-components";

const NaverLoginBar = styled.div`
  width: 300px;
  height: 45px;
  background-color: #06c755;
  border-radius: 6px;
`;

const Naver = () => {
  return (
    <NaverLoginBar>
      <NaverLoginBtn />
      <span>네이버 계정으로 로그인</span>
    </NaverLoginBar>
  );
};

export default Naver;
