import { useState } from "react";
import styled from "styled-components";

// const CalendarWrapper = styled("div")<{ isOpen: boolean }>`

const PriorityContainer = styled.div`
  width: 110px;
  background-color: rgba(255, 190, 190, 0.27);
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-family: "Pretendard";

  & span:first-child {
    color: #8f8f8f;
    font-size: 14px;
  }

  & span:nth-child(2) {
    color: #ff8080;
    font-size: 10px;
  }
`;

const PriorityWrapper = styled("div")<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 52px;
  height: 85px;
  background-color: white;
  z-index: 11;
  position: absolute;
  top: 62.3%;
  left: 48.7%;
  border-radius: 8px;
  border: 0.8px solid var(--festie-gray-600, #949494);
`;

const Prioritylist = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-family: "Pretendard";
  font-size: 12px;
  height: 100%;

  & div:nth-child(1) {
    color: #ff8080;
  }
  & div:nth-child(2) {
    color: #fb9a09;
  }
  & div:nth-child(3) {
    color: #5b9970;
  }
`;

const Priority = () => {
  const [icon, setIcon] = useState("높음");
  const [priorityOpen, setPrioirtyOpen] = useState(false);

  const modalpriorityOpen = () => {
    setPrioirtyOpen(!priorityOpen);
  };

  return (
    <PriorityContainer onClick={modalpriorityOpen}>
      <span>우선 순위</span>
      <span>{icon}</span>

      <PriorityWrapper isOpen={priorityOpen}>
        <Prioritylist>
          <div>높음</div>
          <div>보통</div>
          <div>낮음</div>
        </Prioritylist>
      </PriorityWrapper>
    </PriorityContainer>
  );
};

export default Priority;
