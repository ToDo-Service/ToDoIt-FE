import styled from "styled-components";
import ProgressBar from "../../atoms/ProgressBar";
import TodoModal from "@/organisms/TodoIt/TodoModal";
import { useDrop } from "react-dnd";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const TodoListMainBox = styled.section`
  width: 320px;
  height: 80vh;
  margin-top: 57px;
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
  z-index: 2;
  width: 320px;
  background-color: white;
  opacity: 1;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 19px;
  display: flex;
  position: sticky;
  top: 0;

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
  dayjs.locale("ko");

  const CurrentDate = dayjs().format("M월 DD일 (dd)");

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
          <p>{title === "past_todos" ? "지난 일정" : CurrentDate}</p>
          {title !== "past_todos" ? <ProgressBar /> : null}
        </TodoHeader>
        {children}
        {title !== "past_todos" && <TodoModal method="post" />}
      </TodoListMainBox>
    </>
  );
};

export default KanbanList;
