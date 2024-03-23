import styled from "styled-components";
import ProjectDeatailMainPage from "@/organisms/Project/ProjectDetail/ProjectDetailMainPage";

const ProjectPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const ProjectPageLayout = () => {
  return (
    <ProjectPageLayoutBox>
      <ProjectDeatailMainPage />
    </ProjectPageLayoutBox>
  );
};

export default ProjectPageLayout;
