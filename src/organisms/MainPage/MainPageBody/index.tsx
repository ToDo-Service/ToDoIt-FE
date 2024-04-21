import styled from "styled-components";
import Image from "next/image";
import { motion } from "framer-motion";
import { media } from "@/styles/media";

// f1ebf9
const MainPageBodyBox = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: linear-gradient(white, #e1d0f6);
`;

const MainPageBodyMainText = styled.h1`
  font-family: "Pretendard-Bold";
  font-weight: 300;
`;

const MainPageBodydetailText = styled.p`
  font-family: "PretendardVariable";
  font-weight: 350;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-top: 3vh;
`;

const MainPageBodyStartButton = styled.a`
  text-decoration: none;
  width: 108px;
  height: 38px;
  background-color: #9550ea;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 20px;
  transition: 0.5s ease-in-out;

  &:hover {
    background-color: #6c39a9;
  }

  & span {
    font-family: "PretendardVariable";
    font-weight: 350;
    color: white;
    font-size: 20px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 12px;
  margin-top: 9vh;
`;

const StyledImagePC = styled(Image)`
  display: block;
  position: relative !important;
  height: unset !important;
  border-radius: 20px;
  max-width: 1200px;
  max-height: 700px;
  ${media.phone`
    display: none;
  `}
`;

const StyledImageMobile = styled(Image)`
  display: none;
  position: relative !important;
  height: unset !important;
  border-radius: 20px;
  max-width: 350px;
  max-height: 700px;
  ${media.phone`
    display: block;
  `}
`;

const MainPageBody = () => {
  return (
    <MainPageBodyBox>
      <MainPageBodyMainText>생활을 기록하고 경쟁해보세요.</MainPageBodyMainText>
      <MainPageBodydetailText>
        TodoIt와 함께 친구들과 함께 <br />
        하루를 기록할 수 있는 앱 입니다.
      </MainPageBodydetailText>
      <MainPageBodyStartButton href="/auth/Login">
        <span>시작하기</span>
      </MainPageBodyStartButton>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeInOut",
          duration: 2,
          y: { duration: 1 },
        }}
      >
        <ImageContainer>
          <StyledImagePC
            fill
            src="/Icon/MainPage/MainpagePC.png"
            alt="메인페이지 사진"
          />
          <StyledImageMobile
            fill
            src="/Icon/MainPage/MainPageMoblie.png"
            alt="메인페이지 사진"
          />
        </ImageContainer>
      </motion.div>
    </MainPageBodyBox>
  );
};

export default MainPageBody;
