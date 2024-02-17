import { useState } from "react";
import styled from "styled-components";

const PriorityContainer = styled.div`
  width: 168px;
  background-color: rgba(255, 189, 62, 0.1);
  border: 0.8px solid var(--festie-gray-600, #949494);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-right: 30px;
  font-family: "Pretendard";

  & span:first-child {
    color: #8f8f8f;
    font-size: 14px;
  }

  & span:last-child {
    color: #8f8f8f;
    font-size: 10px;
  }
`;

const Project = () => {
  const [project, setProject] = useState(["바디프로필"]);

  return (
    <PriorityContainer>
      <span>프로젝트</span>
      <span>{project[0]}</span>
    </PriorityContainer>
  );
};

export default Project;
