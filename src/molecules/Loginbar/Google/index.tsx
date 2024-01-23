import GoogleLoginBtn from "@/atoms/LOGIN/GoogleLoginBtn";
import styled from "styled-components";

const GoogleLoginBar = styled.div`
  width: 300px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 6px;
  filter: drop-shadow(1px 2px rgba(12, 0, 24, 0.1));
`;

const Google = () => {
  return (
    <GoogleLoginBar>
      <GoogleLoginBtn />
      <span>구글 계정으로 로그인</span>
    </GoogleLoginBar>
  );
};

export default Google;
