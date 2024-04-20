import styled from "styled-components";
import ProjectDeatailMainPage from "@/organisms/Project/ProjectDetail/ProjectDetailMainPage";
import { FC } from "react";
import { media } from "@/styles/media";

const ProjectPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;

  ${media.phone`
  transition: 0.7s ease-in-out;
      opacity: ${(props: { open: null }) =>
        props.open !== null && props.open ? "0" : "1"} 
  `}
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
