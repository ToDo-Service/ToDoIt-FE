import { useState } from "react";
import styled from "styled-components";

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

  & span:last-child {
    color: #ff8080;
    font-size: 10px;
  }
`;

const Priority = () => {
  const [icon, setIcon] = useState("높음");

  return (
    <PriorityContainer>
      <span>우선 순위</span>
      <span>{icon}</span>
    </PriorityContainer>
  );
};

export default Priority;
