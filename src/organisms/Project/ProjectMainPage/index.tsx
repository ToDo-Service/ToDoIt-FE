import styled from "styled-components";
import Projectbox from "@/molecules/PROJECT/Projectbox";
import ProjectInputbox from "@/molecules/PROJECT/ProjectInput";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import ProjectModal from "@/organisms/Project/ProjectModal";
import { useSession } from "next-auth/react";
import { HtmlHTMLAttributes, useCallback, useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";

const ProjectPageMainBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 310px;
  padding-top: 170px;
  flex-direction: column;
  overflow: hidden;
  padding-left: 310px;
  padding-top: 170px;
`;
const ProjectList = styled.div`
  overflow-y: scroll;
  margin-top: 24px;
  border-radius: 12px;
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  & div:not(:first-child) {
    margin-top: 12px;
  }
`;

const ProjectUserName = styled.p`
  font-family: "Pretendard";
  font-size: 20px;

  margin-top: 69px;
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
  const [filterProejct, setFilterProject] = useState<string>("");
  const jwt = useRecoilValue(jwtToken);

  const { data, error, isLoading } = useSWR(
    jwt.token !== "" && "https://laoh.site/api/project",
    (url: string) => fetcher(url, jwt)
  );

  const openModal = () => {
    setModal(!modal);
  };

  const SearchProject = useCallback(
    (e: any) => {
      setFilterProject(e.target.value);
    },
    [filterProejct]
  );

  const FindProject =
    data &&
    data.body.filter((e: ProejectT) => {
      return e.title
        .replace(" ", "")
        .toLowerCase()
        .includes(filterProejct.replace(" ", "").toLocaleLowerCase());
    });

  return (
    <ProjectPageMainBox>
      <ProjectInputbox SearchProject={SearchProject} />
      <ProjectUserName>{session.data?.user.name}'s 프로젝트</ProjectUserName>
      <ProjectList>
        {FindProject
          ? FindProject.map((e: ProejectT) => {
              return (
                <Projectbox
                  description={e.description}
                  title={e.title}
                  color={e.color}
                  id={e.id}
                />
              );
            })
          : data
          ? data.body.map((e: ProejectT) => {
              return (
                <Projectbox
                  description={e.description}
                  title={e.title}
                  color={e.color}
                  id={e.id}
                />
              );
            })
          : undefined}
        <ProjectAdd onclick={openModal} width="790px" />
      </ProjectList>
      {modal ? <ProjectModal onclose={openModal} /> : undefined}
    </ProjectPageMainBox>
  );
};

export default ProjectMainPage;
