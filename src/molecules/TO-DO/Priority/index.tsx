import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// const CalendarWrapper = styled("div")<{ isOpen: boolean }>`

const PriorityContainer = styled("div")<{ Color: string; bgColor: string }>`
  width: 110px;
  background-color: ${(props) => props.bgColor};
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
    color: ${(props) => props.Color};
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

const PriorityData = [
  {
    id: 1,
    text: "높음",
    color: "#ff8080",
    bgcolor: "rgba(255, 190, 190, 0.27)",
  },
  {
    id: 2,
    text: "보통",
    color: "#FB9A09",
    bgcolor: "rgba(255, 191, 133, 0.27)",
  },
  {
    id: 3,
    text: "낮음",
    color: "#5B9970",
    bgcolor: "rgba(190, 231, 194, 0.27)",
  },
];

const Priority = () => {
  const [text, setText] = useState("높음");
  const [color, setColor] = useState("#ff8080");
  const [bgcolor, setBgcolor] = useState("rgba(255, 190, 190, 0.27)");
  const [priorityOpen, setPrioirtyOpen] = useState(false);

  const modalpriorityOpen = () => {
    setPrioirtyOpen(!priorityOpen);
  };

  const test = (e: any) => {
    console.log(e.target.innerHTML);
    PriorityData.map((p) => {
      if (p.text === e.target.innerHTML) {
        setText(p.text);
        setColor(p.color);
        setBgcolor(p.bgcolor);
      }
    });
  };

  return (
    <PriorityContainer
      onClick={modalpriorityOpen}
      Color={color}
      bgColor={bgcolor}
    >
      <span>우선 순위</span>
      <span>{text}</span>
      <PriorityWrapper isOpen={priorityOpen}>
        <Prioritylist>
          {PriorityData.map((e) => {
            return (
              <div onClick={test} key={e.id}>
                {e.text}
              </div>
            );
          })}
        </Prioritylist>
      </PriorityWrapper>
    </PriorityContainer>
  );
};

export default Priority;
