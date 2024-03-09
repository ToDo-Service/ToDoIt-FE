import styled from "styled-components";

const ProjectboxAddMainbox = styled.div`
  width: 790px;
  height: 55px;
  border-radius: 12px;
  padding-left: 25px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px solid rgba(12, 0, 24, 0.1);
  background-color: rgba(12, 0, 24, 0.04);
  & span {
    color: rgba(37, 37, 48, 0.6);
    font-size: 15px;
  }
`;

const ProjectAdd = (props: any) => {
  return (
    <ProjectboxAddMainbox onClick={props.onclick}>
      <span>+ 프로젝트를 추가하세요</span>
    </ProjectboxAddMainbox>
  );
};

export default ProjectAdd;
