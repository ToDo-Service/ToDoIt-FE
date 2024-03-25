import styled from "styled-components";
import ProgressBar from "../../atoms/ProgressBar";
import TodoModal from "@/organisms/TodoIt/TodoModal";
import { useDrop } from "react-dnd";
import { motion, AnimatePresence } from "framer-motion";

const animate = {
  initial: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
  animate: {
    transform: `translateY(0px)`,
    opacity: 1,
    transition: `transform 0.33s ease`,
  },
  exit: {
    transform: `translateY(50px)`,
    opacity: 0,
    transition: `transform 0.33s ease`,
  },
};

const TodoListMainBox = styled.section`
  width: 30vw;
  height: 80vh;
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
  z-index: 2;
  width: 325px;
  background-color: white;
  opacity: 1;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 19px;
  display: flex;
  position: sticky;
  top: 0;
  /* top: 140px; */

  /* align-items: center; */
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
        <AnimatePresence>
          <motion.div
            initial={animate.initial}
            //@ts-ignore
            animate={animate.animate}
            //@ts-ignore
            exit={animate.exit}
          >
            {children}
          </motion.div>
        </AnimatePresence>
        {title !== "past_todos" ? <TodoModal method="post" /> : null}
      </TodoListMainBox>
    </>
  );
};

export default KanbanList;
