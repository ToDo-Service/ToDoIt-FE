import ProjectHeader from "@/organisms/Project/ProjectHeader";
import ProjectMainPage from "@/organisms/Project/ProjectMainPage";
import styled from "styled-components";

const ProjectPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  /* margin-left: 230px; */
`;

const ProjectPageLayout = () => {
  return (
    <>
      <ProjectPageLayoutBox>
        <ProjectHeader />
        <ProjectMainPage />
      </ProjectPageLayoutBox>
    </>
  );
};

export default ProjectPageLayout;
