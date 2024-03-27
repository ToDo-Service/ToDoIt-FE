import ProjectMainPage from "@/organisms/Project/ProjectMainPage";
import styled from "styled-components";
import { FC } from "react";
import { TodayData } from "@/types/tb";

const ProjectPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const ProjectPageLayout: FC = () => {
  return (
    <>
      <ProjectPageLayoutBox>
        <ProjectMainPage />
      </ProjectPageLayoutBox>
    </>
  );
};

export default ProjectPageLayout;
