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
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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

  ${media.phone`
  padding-left: 0;
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `}

  & .projectlists {
    display: flex;

    & .proejctitem:not(:first-child) {
      margin-right: 24.72px;
    }
  }
`;

const ProjectDetailHeaderText = styled.h3`
  font-size: 20px;
  position: sticky;
  height: max-content;
  top: 0;
  font-family: "Pretendard-Bold";
  font-weight: 300;
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

const ProjectDetailBelongPersonList = styled.ul`
  list-style: none;
  display: flex;
  width: max-content;
  margin-left: 0;
  padding-left: 0;

  & li:not(:first-child) {
    margin-left: 35px;
  }
`;

const ProjectDetailBelongPerson = styled.li`
  font-family: "PretendardVariable";
  font-weight: 250;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 81ox;
  min-width: 81px;
  height: 40px;
`;

const ProjectDetailUserImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 30px;
`;

const ProjectDetailUserName = styled.p`
  font-family: "PretendardVariable";
  font-weight: 250;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  margin-top: 0;
  margin-bottom: 0;
`;

const ProejctDetailProgressLayout = styled.div`
  max-width: 330px;
  max-height: 550px;
  width: 22.9167vw;
  height: 53.7109vh;
  background-color: rgba(12, 0, 24, 0.04);
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

  const [UserList, setUserList] = useState([
    { id: 1, name: "승연", img: "/Icon/Modal/ModalExit.png" },
    { id: 2, name: "연준", img: "/Icon/Modal/ModalExit.png" },
    { id: 3, name: "승찬", img: "/Icon/Modal/ModalExit.png" },
  ]);

  const HeaderText: string = data?.body.project_info.title;

  const setModal = useSetRecoilState(Modal);

  const handleChange = (result: any) => {
    if (!result.destination) return;
    const items = [...UserList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setUserList(items);
  };

  const openAddModal = () => {
    setModal({ method: "post", toggle: true });
  };

  return (
    <ProjectDetailMainPageBox>
      <ProjectDetailHeaderText>{HeaderText}</ProjectDetailHeaderText>
      <ProjectDetailBelongPersonList>
        {UserList.map((user) => {
          return (
            <ProjectDetailBelongPerson>
              <ProjectDetailUserImg src={user.img} alt="/" />
              <ProjectDetailUserName>{user.name}</ProjectDetailUserName>
            </ProjectDetailBelongPerson>
          );
        })}
      </ProjectDetailBelongPersonList>
      <DragDropContext onDragEnd={handleChange}>
        <Droppable droppableId="projectlists">
          {(provided) => (
            <div
              className="projectlists"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <ProejctDetailProgressLayout>
                {UserList.map((e: any, i: number) => {
                  return (
                    <Draggable
                      draggableId={`test-${e.id}`}
                      index={i}
                      key={`test-${e.id}`}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            className="proejctitem"
                          >
                            {e.name}
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
              </ProejctDetailProgressLayout>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ProjectDetailMainPageBox>
  );
};

export default ProjectDeatailMainPage;
