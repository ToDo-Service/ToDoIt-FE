import GoogleLoginBtn from "@/atoms/LOGIN/GoogleLoginBtn";
import styled from "styled-components";
import Link from "next/link";

const GoogleLoginBar = styled.div`
  width: 300px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 6px;
  filter: drop-shadow(1px 2px rgba(12, 0, 24, 0.1));
  display: flex;
  align-items: center;
  padding-left: 14px;
  & span {
    margin-left: 30px;
  }
  margin-bottom: 14px;
`;

const Google = () => {
  return (
    <Link
      href={"/https://laoh.site/oauth2/authorization/google"}
      style={{ textDecoration: "none", color: "black" }}
    >
      <GoogleLoginBar>
        <GoogleLoginBtn />
        <span>구글 계정으로 로그인</span>
      </GoogleLoginBar>
    </Link>
  );
};

export default Google;
