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
  justify-content: center;
  /* background-image: linear-gradient(white, #e1d0f6); */
  background-color: #721cbb;
`;

const MainPageBodyMainText = styled.h1`
  font-family: "Pretendard-Bold";

  font-weight: 280;
  color: white;
  font-size: 40px;
  margin-bottom: 0;

  ${media.phone`
  font-size: 20px;
  text-align: center;
  `}
`;

const MainPageBodydetailText = styled.p`
  font-family: "PretendardVariable";
  font-weight: 300;
  color: rgba(0, 0, 0, 0.5);
  text-align: center;
  margin-top: 7.0313vh;
  color: white;
  font-size: 20px;
  margin-bottom: 0;
  ${media.phone`
  font-size: 15px;
  
  `}
`;

const MainPageBodyStartButton = styled.a`
  text-decoration: none;
  width: 133px;
  height: 41px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  margin-top: 3.0273vh;

  transition: 0.5s ease-in-out;

  &:hover {
    background-color: #711cbb9c;
  }

  & span:hover {
    color: white;
  }

  & span {
    transition: 0.5s ease-in-out;
    font-family: "PretendardVariable";
    font-weight: 350;
    color: black;
    font-size: 20px;
  }
`;

const TodoItLogo = styled.img`
  width: 32.6389vw;
  max-width: 470px;
  max-height: 108px;
  min-width: 470px;
  min-height: 108px;
  height: 10.5469vh;

  ${media.phone`
  padding: 0 20px;
  `}
`;

const MainPageBody = () => {
  return (
    <MainPageBodyBox>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeIn",
          duration: 1,
          y: { duration: 1 },
        }}
      >
        <TodoItLogo src="/Icon/TodoItMainLogo.png" alt="메인 로고" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeIn",
          duration: 1,
          y: { duration: 1 },
        }}
      >
        <MainPageBodyMainText>
          계획을 기록하고 완성해 보세요.
        </MainPageBodyMainText>
        <MainPageBodydetailText>
          '할 일'을 '한 일'로 완성하기 위한 일정 관리 서비스,
          <br /> 투두잇과 함께라면 당신의 계획이 의미 있게 될 거예요.
        </MainPageBodydetailText>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          ease: "easeIn",
          duration: 1,
          y: { duration: 1 },
        }}
      >
        <MainPageBodyStartButton href="/auth/Login">
          <span>시작하기</span>
        </MainPageBodyStartButton>
      </motion.div>
    </MainPageBodyBox>
  );
};

export default MainPageBody;
