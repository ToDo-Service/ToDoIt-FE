import styled from "styled-components";
import Projectbox from "@/molecules/PROJECT/Projectbox";
import ProjectInputbox from "@/molecules/PROJECT/ProjectInput";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import ProjectModal from "@/organisms/Project/ProjectModal";
import { useSession } from "next-auth/react";
import { FC, useCallback, useState } from "react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import type { ProejectT } from "@/types/tb";
import { media } from "@/styles/media";

const ProjectPageMainBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding-left: 294px;
  padding-top: 170px;
  flex-direction: column;

  ${media.phone`
    padding-left:0;
    padding-top: 120px;  
    align-items: center;
    width:125%;
    height:100%;
    margin: 0;
  `}
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
  & > div:not(:first-child) {
    margin-top: 12px;
  }

  ${media.phone`
      width:100vw;
      display: flex;
      flex-direction: column;
      align-items: center;
  `}
`;

const ProjectUserName = styled.span`
  font-family: "Pretendard-Bold";
  font-weight: 300;
  font-size: 20px;
  margin-top: 69px;
  margin-right: 34vw;

  ${media.phone`
  margin-right: 45vw;
  `}
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
                  enddate={e.end_date}
                  category={e.category}
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
                  enddate={e.end_date}
                  category={e.category}
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
      {modal && <ProjectModal onclose={openModal} method="post" />}
    </ProjectPageMainBox>
  );
};

export default ProjectMainPage;
