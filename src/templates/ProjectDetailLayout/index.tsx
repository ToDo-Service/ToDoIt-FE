import ProjectHeader from "@/organisms/Project/ProjectHeader";
import ProjectMainPage from "@/organisms/Project/ProjectMainPage";
import styled from "styled-components";

const ProjectPageLayoutBox = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  padding-left: 230px;
`;

const ProjectPageLayout = () => {
  return (
    <>
      <ProjectHeader />
      <ProjectPageLayoutBox>{/* <div>테스트</div> */}</ProjectPageLayoutBox>
    </>
  );
};

export default ProjectPageLayout;
