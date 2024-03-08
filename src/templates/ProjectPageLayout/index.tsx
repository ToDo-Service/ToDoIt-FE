import ProjectHeader from "@/organisms/Project/ProjectyHeader";
import ProjectMainPage from "@/organisms/Project/ProjectMainPage";
import styled from "styled-components";

const ProjectPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  padding-left: 230px;
`;

const ProjectPageLayout = () => {
  return (
    <ProjectPageLayoutBox>
      <ProjectHeader />
      <ProjectMainPage />
    </ProjectPageLayoutBox>
  );
};

export default ProjectPageLayout;
