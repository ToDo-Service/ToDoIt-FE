import styled from "styled-components";

const TodoMainBox = styled.div`
  border-radius: 16px;
  width: 25vw;
  height: 10vh;
  border: 0.5px solid #c8c5cb;
  box-shadow: 1px 1px 1px 1px #c8c5cb;
`;

const TodoRecentHeaderText = styled.h3`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 20px;
`;

const TodoBox = () => {
  return (
    <article>
      <TodoRecentHeaderText>지난 일정</TodoRecentHeaderText>
      <TodoMainBox>투두박스입니다</TodoMainBox>
    </article>
  );
};

export default TodoBox;
