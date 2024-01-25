import KakaoLoginBtn from "@/atoms/LOGIN/KakaoLoginBtn";
import styled from "styled-components";
import Link from "next/link";

const KakaoLoginBar = styled.div`
  width: 300px;
  height: 45px;
  background-color: #fee500;
  border-radius: 6px;
  display: flex;
  align-items: center;
  padding-left: 14px;
  & span {
    margin-left: 30px;
  }
  margin-bottom: 14px;
`;

const Kakao = () => {
  return (
    <Link
      href={"https://laoh.site/oauth2/authorization/kakao"}
      style={{ textDecoration: "none", color: "black" }}
    >
      <KakaoLoginBar>
        <KakaoLoginBtn />
        <span>카카오 계정으로 로그인</span>
      </KakaoLoginBar>
    </Link>
  );
};

export default Kakao;
