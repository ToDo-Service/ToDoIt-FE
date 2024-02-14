import styled from "styled-components";
import TodoModal from "@/molecules/TO-DO/TodoModal";
import { useDrop } from "react-dnd";

const TodoListMainBox = styled.section`
  width: 25vw;
  height: 100vh;
  margin-top: 57px;
  margin-left: 67px;
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

const KanbanList = ({ title, children, enTitle }: any) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "card",
    drop: () => ({ name: enTitle }),
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
          {title}
          {title != "지난 일정" ? <TodoModal /> : null}
        </TodoHeader>
        {children}
      </TodoListMainBox>
    </>
  );
};

export default KanbanList;
