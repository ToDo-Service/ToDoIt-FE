import styled from "styled-components";
import Projectbox from "@/molecules/PROJECT/Projectbox";
import ProjectInputbox from "@/molecules/PROJECT/ProjectInput";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import ProjectModal from "@/organisms/Project/ProjectModal";
import { useSession } from "next-auth/react";
import { FC, HtmlHTMLAttributes, useCallback, useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import type { ProejectT } from "@/types/tb";

const ProjectPageMainBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 310px;
  padding-top: 170px;
  flex-direction: column;
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
  font-family: "Pretendard-Bold";
  font-weight: 300;
  font-size: 20px;
  margin-top: 69px;
`;

const ProjectMainPage: FC = () => {
  const session = useSession();
  const [modal, setModal] = useState(false);
  const [filterProejct, setFilterProject] = useState<string>("");
  const jwt = useRecoilValue(jwtToken);

  const { data } = useSWR(
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

  const FindProject = data?.body.filter((e: ProejectT) => {
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
          : data?.body.map((e: ProejectT) => {
              return (
                <Projectbox
                  description={e.description}
                  title={e.title}
                  color={e.color}
                  id={e.id}
                />
              );
            })}
        <ProjectAdd
          onclick={openModal}
          width="54.8611vw"
          comment="+ 프로젝트를 추가하세요"
          maxwidth="791px"
        />
      </ProjectList>
      {modal && <ProjectModal onclose={openModal} />}
    </ProjectPageMainBox>
  );
};

export default ProjectMainPage;
