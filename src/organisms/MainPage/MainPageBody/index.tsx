import styled from "styled-components";

const MainPageBodyImg = styled.div`
  width: 100vw;
  height: 50vh;
  background: url("/background/MainBackground.jpg");
  background-repeat: repeat;
  background-size: cover;
  background-size: 100vh;
`;

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
  font-style: "Pretendard";
`;

const MainPageBodydetailText = styled.p`
  font-style: "Pretendard";
`;

const MainPageBodyStartButton = styled.a`
  text-decoration: none;
  width: 108px;
  height: 38px;
  background-color: #dfccf7;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin-top: 20px;
  transition: 1s ease-in-out;

  &:hover {
    background-color: #c29bf3;
  }

  & span {
    font-style: "Pretendard";
    color: white;
    font-size: 20px;
  }
`;

const MainPageBody = () => {
  return (
    <MainPageBodyBox>
      <MainPageBodyMainText>생활을 기록하고 경쟁해보세요.</MainPageBodyMainText>
      <MainPageBodydetailText>
        TodoIt와 함께 친구들과 함께 하루를 기록할 수 있는 앱 입니다.{" "}
      </MainPageBodydetailText>
      <MainPageBodyStartButton href="/auth/Login">
        <span>시작 하기</span>
      </MainPageBodyStartButton>
    </MainPageBodyBox>
  );
};

export default MainPageBody;
