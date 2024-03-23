import styled from "styled-components";

const ProjectDetailMainPageBox = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 345px;
  padding-top: 163px;
  font-family: "Pretendard";
`;

const ProjectDetailHeaderText = styled.h3`
  font-size: 20px;
  margin-bottom: 40px;
`;

const ProjectDeatailMainPage = () => {
  return (
    <ProjectDetailMainPageBox>
      <ProjectDetailHeaderText>헤더 텍스트</ProjectDetailHeaderText>
      <div>TODOBOX</div>
      <div>Add</div>
    </ProjectDetailMainPageBox>
  );
};

export default ProjectDeatailMainPage;
