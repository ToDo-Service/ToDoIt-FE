import styled from "styled-components";

const ProjectDateMainBox = styled.div`
  width: 59px;
  height: 29px;
  background-color: rgba(246, 246, 246, 0.1);
  color: #8f8f8f;

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 8px;
  font-size: 14px;
  font-family: "PretendardVariable";
  font-weight: 250;
`;

const ProjectDate = () => {
  return <ProjectDateMainBox>월요일</ProjectDateMainBox>;
};

export default ProjectDate;
