import NaverLoginBtn from "@/atoms/LOGIN/NaverLogin";
import styled from "styled-components";
import Link from "next/link";

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
  margin-bottom: 14px;
`;

const Naver = () => {
  return (
    <Link
      href={"/https://laoh.site/oauth2/authorization/kakao"}
      style={{ textDecoration: "none", color: "black" }}
    >
      <NaverLoginBar>
        <NaverLoginBtn />
        <span>네이버 계정으로 로그인</span>
      </NaverLoginBar>
    </Link>
  );
};

export default Naver;
