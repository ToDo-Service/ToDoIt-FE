import TodoBox from "@/molecules/TO-DO/TodoBox";
import styled from "styled-components";

const TodoListMainBox = styled.section`
  width: 25vw;
  height: 100vh;
  margin-top: 57px;
  margin-left: 67px;
`;
const TodoRecentHeaderText = styled.h3`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 20px;
`;

const TodoList = () => {
  return (
    <TodoListMainBox>
      <TodoRecentHeaderText>지난 일정</TodoRecentHeaderText>
      <TodoBox />
    </TodoListMainBox>
  );
};

export default TodoList;
