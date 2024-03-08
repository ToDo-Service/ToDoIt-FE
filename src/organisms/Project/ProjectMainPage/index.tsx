import styled from "styled-components";
import Projectbox from "@/molecules/PROJECT/Projectbox";
import ProjectInputbox from "@/molecules/PROJECT/ProjectInput";
import useSWR from "swr";
import { useSession } from "next-auth/react";

const AddProject = styled.div`
  width: 791px;
  height: 55px;
  background-color: rgba(12, 0, 24, 0.1);
  /* border-radius: 12px; */
  margin-top: 15px;
  display: flex;
  padding-left: 31px;
  align-items: center;
  font-family: "Pretendard";
  font-size: 15px;
  color: rgba(37, 37, 48, 0.6);

  &:hover {
    background-color: rgba(12, 0, 24, 0.38);
    transition: 0.5s ease-in-out;
  }
`;
const ProjectPageMainBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 80px;
  padding-top: 170px;
`;
const ProjectList = styled.div`
  margin-top: 69px;
`;

const ProjectUserName = styled.div`
  font-family: "Pretendard";
  font-size: 20px;
  margin-bottom: 24px;
`;

const ProjectMainPage = () => {
  const session = useSession();

  return (
    <ProjectPageMainBox>
      <ProjectInputbox />
      <ProjectList>
        <ProjectUserName>{session.data?.user.name}'s 프로젝트</ProjectUserName>
        <Projectbox />
      </ProjectList>
    </ProjectPageMainBox>
  );
};

export default ProjectMainPage;
