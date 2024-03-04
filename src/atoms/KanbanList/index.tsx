import styled from "styled-components";
import ProgressBar from "../ProgressBar";
import TodoModal from "@/organisms/TodoModal";
import { useDrop } from "react-dnd";

const TodoListMainBox = styled.section`
  width: 30vw;
  height: 100vh;
  margin-top: 57px;
  margin-left: 45px;
  z-index: 1;
  overflow-y: scroll;
  & article:not(:first-child) {
    margin-top: 21px;
  }
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TodoHeader = styled("div")<{ interval: string }>`
  width: 291px;
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 19px;
  display: flex;
  position: sticky;
  top: 0px;
  align-items: center;
  justify-content: ${(props) =>
    props.interval !== "past_todos" ? "space-between" : "space-between"};

  & p {
    display: flex;
    align-items: center;
    font-family: "Pretendard";
    font-weight: 500;
  }
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
          <p>{title === "past_todos" ? "지난 일정" : "오늘 일정"}</p>
          {title !== "past_todos" ? <ProgressBar /> : null}
        </TodoHeader>

        {children}
        {title !== "past_todos" ? <TodoModal method="post" /> : null}
      </TodoListMainBox>
    </>
  );
};

export default KanbanList;
