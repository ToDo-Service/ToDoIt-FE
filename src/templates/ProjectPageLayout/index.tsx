import ProjectMainPage from "@/organisms/Project/ProjectMainPage";
import styled from "styled-components";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { SidebarLayout } from "@/reocoil";
import { media } from "@/styles/media";

const ProjectPageLayoutBox = styled.div<{ open: boolean | null }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  animation: 0.7s
    ${(prop) =>
      prop.open !== null && prop.open ? "PopUpProeject" : "PopOutProeject"}
    forwards;

  @keyframes PopUpProeject {
    0% {
      transform: translate(-10%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutProeject {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-10%, 0);
    }
  }

  ${media.phone`
  transition: 0.7s ease-in-out;
      opacity: ${(props: { open: null }) =>
        props.open !== null && props.open ? "0" : "1"} 
  `}
`;

const ProjectPageLayout: FC = () => {
  const SToogleState = useRecoilValue(SidebarLayout);
  return (
    <>
      <ProjectPageLayoutBox open={SToogleState.sidebartoggle}>
        <ProjectMainPage />
      </ProjectPageLayoutBox>
    </>
  );
};

export default ProjectPageLayout;
