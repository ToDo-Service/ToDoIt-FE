import styled from "styled-components";
import ProgressBar from "../ProgressBar";
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

const TodoHeader = styled("div")<{ interval: string }>`
  width: 291px;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 19px;
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.interval !== "past_todos" ? "space-evenly" : "space-between"};
`;

const KanbanList = ({ title, children }: any) => {
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
        <TodoHeader interval={title}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {title === "past_todos" ? "지난 일정" : "오늘 일정"}
            {title !== "past_todos" ? <TodoModal /> : null}
          </div>
          {title !== "past_todos" ? <ProgressBar /> : null}
        </TodoHeader>
        {children}
      </TodoListMainBox>
    </>
  );
};

export default KanbanList;
