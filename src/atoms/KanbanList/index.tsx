import styled from "styled-components";
import TodoModal from "@/organisms/TodoModal";
import { useDrop } from "react-dnd";

const TodoListMainBox = styled.section`
  width: 25vw;
  height: 100vh;
  margin-top: 57px;
  margin-left: 67px;

  & article:not(:first-child) {
    margin-top: 21px;
  }
`;

const TodoHeader = styled.div`
  width: 132px;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 19px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const KanbanList = ({ title, children }: any) => {
  // console.log(title);
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "card",
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      //drag 진행동안 canDrop true,
      //drop할 영역 접근시 isOver : true
    }),
  });

  return (
    <>
      <TodoListMainBox ref={drop}>
        <TodoHeader>
          {title === "past_todos" ? "지난 일정" : "오늘 일정"}
          {title !== "past_todos" ? <TodoModal /> : null}
        </TodoHeader>
        {children}
      </TodoListMainBox>
    </>
  );
};

export default KanbanList;
