import styled from "styled-components";
import ProjectDeatailMainPage from "@/organisms/Project/ProjectDetail/ProjectDetailMainPage";
import { FC } from "react";

const ProjectPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

interface ProjectDetailProps {
  ProjectId: string;
}

const ProjectPageLayout: FC<ProjectDetailProps> = (props) => {
  return (
    <ProjectPageLayoutBox>
      <ProjectDeatailMainPage ProjectId={props.ProjectId} />
    </ProjectPageLayoutBox>
  );
};

export default ProjectPageLayout;
