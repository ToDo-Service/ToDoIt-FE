import styled from "styled-components";
import ProjectTodoBox from "@/molecules/PROJECT/ProjectDetail/ProjectDetailTodoBox";
import { useRouter } from "next/router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, jwtToken } from "@/reocoil";
import Fetcher from "@/utils/fetcher";
import useSWR from "swr";
import ProjectAdd from "@/molecules/PROJECT/ProjectAdd";
import { FC, useState } from "react";
import { ProejectTodoAdd } from "@/organisms/Project/ProjectDetail/ProjectTodoAddModal";
import { media } from "@/styles/media";

interface TodoItem {
  content: string;
  end_date: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

const ProjectDetailMainPageBox = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 345px;
  padding-top: 163px;
  font-family: "Pretendard";

  ${media.phone`
  padding-left: 0;
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;

  `}
`;

const ProjectDetailHeaderText = styled.h3`
  font-size: 20px;
  position: sticky;
  height: max-content;
  top: 0;
  padding-left: 5px;
  padding-top: 5px;
  margin-bottom: 40px;
`;

const ProjectDetailList = styled.section`
  height: 90%;
  overflow-y: scroll;
  border-radius: 12px;
  & {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;
interface ProjectDetailProps {
  ProjectId: string;
}

const ProjectDeatailMainPage: FC<ProjectDetailProps> = (props) => {
  const JwtToken = useRecoilValue(jwtToken);
  const { data } = useSWR(
    props.ProjectId && `https://laoh.site/api/project/${props.ProjectId}`,
    (url: string) => Fetcher(url, JwtToken)
  );

  const HeaderText: string = data?.body.project_info.title;
  const TodoList: Array<TodoItem> = data?.body.todo_list;
  // const [modal, setModal] = useState(false);
  const setModal = useSetRecoilState(Modal);
  const modal = useRecoilValue(Modal);

  const openAddModal = () => {
    setModal({ method: "post", toggle: true });
  };

  return (
    <ProjectDetailMainPageBox>
      <ProjectDetailList>
        <ProjectDetailHeaderText>{HeaderText}</ProjectDetailHeaderText>
        {TodoList &&
          TodoList.map((item: TodoItem) => {
            return <ProjectTodoBox todolist={item} />;
          })}
        <ProjectAdd
          width="22.2222vw"
          comment="+ 할 일을 추가하세요"
          maxwidth="320px"
          minwidth="320px"
          onclick={openAddModal}
        />
      </ProjectDetailList>
      {modal && props.ProjectId && openAddModal && (
        <ProejectTodoAdd projectId={props.ProjectId} onclose={openAddModal} />
      )}
    </ProjectDetailMainPageBox>
  );
};

export default ProjectDeatailMainPage;
