import KakaoLoginBtn from "@/atoms/LOGIN/KakaoLoginBtn";
import styled from "styled-components";

const KakaoLoginBar = styled.div`
  width: 300px;
  height: 45px;
  background-color: #fee500;
  border-radius: 6px;
`;

const Kakao = () => {
  return (
    <KakaoLoginBar>
      <KakaoLoginBtn />
      <span>카카오 계정으로 로그인</span>
    </KakaoLoginBar>
  );
};

export default Kakao;
