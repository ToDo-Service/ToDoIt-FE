import { useEffect, useState } from "react";

import styled from "styled-components";

const RepeatAddContainer = styled("div")`
  width: 168px;
  height: 37px;
  border: 1px solid rgba(12, 0, 24, 0.1);
  background-color: #f6f6f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  font-family: "PretendardVariable";
  font-weight: 250;
  position: relative;
  cursor: pointer;
`;

const SelectedDayContainer = styled.div`
  color: #8f8f8f;
  width: 103px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 11px;

  & div:nth-child(1) {
    font-size: 14px;
  }
  & div:nth-child(2) {
    font-size: 10px;
  }
`;

const PriorityWrapper = styled("div")<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  width: 106px;
  height: 182px;
  background-color: white;
  z-index: 11;
  position: absolute;
  top: 120%;
  left: 38%;
  border-radius: 8px;
  border: 0.8px solid var(--festie-gray-600, #949494);
`;

const Prioritylist = styled.div`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  font-size: 10px;
  color: #8f8f8f;
  width: 44px;
  height: 162px;
  height: 100%;
  margin-left: 14px;
  & div {
    cursor: pointer;
  }
`;

const dayOfWeek = [
  { id: 0, title: "월요일마다" },
  { id: 1, title: "화요일마다" },
  { id: 2, title: "수요일마다" },
  { id: 3, title: "목요일마다" },
  { id: 4, title: "금요일마다" },
  { id: 5, title: "토요일마다" },
  { id: 6, title: "일요일마다" },
];

const ProejctAddRepeat = ({ onChange, value }: any) => {
  const [repeatOpen, setRepeatOpen] = useState(false);
  const modalRepeatOpen = () => {
    setRepeatOpen(!repeatOpen);
  };
  const Selected = (e: React.MouseEvent<HTMLElement>) => {
    onChange((e.target as HTMLElement).innerText);
  };

  return (
    <RepeatAddContainer onClick={modalRepeatOpen}>
      <SelectedDayContainer>
        <div>일정 반복</div>
        <div>{value}</div>
      </SelectedDayContainer>
      <PriorityWrapper isOpen={repeatOpen}>
        <Prioritylist>
          {dayOfWeek.map((item) => {
            return (
              <div key={item.id} onClick={Selected}>
                {item.title}
              </div>
            );
          })}
        </Prioritylist>
      </PriorityWrapper>
    </RepeatAddContainer>
  );
};

export default ProejctAddRepeat;
