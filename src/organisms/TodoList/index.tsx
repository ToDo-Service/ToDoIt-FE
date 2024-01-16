import TodoBox from "@/molecules/TO-DO/TodoBox";
import styled from "styled-components";

const TodoListMainBox = styled.section`
  width: 25vw;
  height: 100vh;
  margin-top: 57px;
  margin-left: 67px;
`;

const TodoList = () => {
  return (
    <TodoListMainBox>
      <TodoBox />
    </TodoListMainBox>
  );
};

export default TodoList;
