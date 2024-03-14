import styled from "styled-components";
import Projectbox from "@/molecules/PROJECT/Projectbox";
import ProjectInputbox from "@/molecules/PROJECT/ProjectInput";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import ProjectModal from "@/organisms/Project/ProjectModal";
import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";

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

  & div:not(:first-child) {
    margin-top: 12px;
  }
`;

const ProjectUserName = styled.p`
  font-family: "Pretendard";
  font-size: 20px;
  margin-bottom: 24px;
`;

interface ProejectT {
  id: number;
  category: string;
  color: string;
  description: string;
  end_date: string;
  title: string;
}

const ProjectMainPage = () => {
  const session = useSession();
  const [modal, setModal] = useState(false);
  const jwt = useRecoilValue(jwtToken);

  const { data, error, isLoading } = useSWR(
    "https://laoh.site/api/project",
    (url) => fetcher(url, jwt)
  );

  const openModal = () => {
    setModal(!modal);
  };

  return (
    <ProjectPageMainBox>
      <ProjectInputbox />
      <ProjectList>
        <ProjectUserName>{session.data?.user.name}'s 프로젝트</ProjectUserName>
        {data.body.map((e: ProejectT) => {
          return (
            <Projectbox
              description={e.description}
              title={e.title}
              color={e.color}
            />
          );
        })}
      </ProjectList>
      <ProjectAdd onclick={openModal} />
      {modal ? <ProjectModal onclose={openModal} /> : undefined}
    </ProjectPageMainBox>
  );
};

export default ProjectMainPage;
