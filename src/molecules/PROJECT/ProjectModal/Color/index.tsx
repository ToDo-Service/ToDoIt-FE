import styled from "styled-components";

const ProjectColorMainbox = styled.div`
  width: 125px;
  height: 37px;
  border-radius: 8px;
  background-color: rgba(254, 152, 174, 0.15);
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(254, 152, 174, 0.15);
  padding-left: 11px;
  & div {
    color: #8f8f8f;
  }
  & div:first-child {
    font-size: 14px;
  }
  & div:last-child {
    font-size: 10px;
  }
`;
const ProjectColorTextBox = styled.div`
  width: 77px;
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const ProjectColor = () => {
  return (
    <ProjectColorMainbox>
      <ProjectColorTextBox>
        <div>색상</div>
        <div>핑크</div>
      </ProjectColorTextBox>
    </ProjectColorMainbox>
  );
};

export default ProjectColor;
