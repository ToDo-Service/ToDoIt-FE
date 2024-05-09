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
  padding-left: 304px;
  padding-top: 163px;

  ${media.phone`
  padding-left: 0;
  padding-top: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  `}

  & .projectlists {
    /* display: flex; */

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
  margin-bottom: 36px;
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
  background-color: rgba(130, 4, 255, 0.05);
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
  max-width: 328px;
  max-height: 550px;
  width: 22.9167vw;
  height: 53.7109vh;
  background-color: rgba(12, 0, 24, 0.04);
`;

const ProjectProgressList = styled.div`
  display: flex;
  margin-top: 70px;
  width: 100%;
  max-width: 1072px;
  justify-content: space-between;
  /* padding-right: 3vw; */
`;

const ProjectProgressHeader = styled.h3`
  font-size: 15px;
  color: black;
  font-family: "Pretendard-SemiBold";
  font-weight: 280;
  margin-bottom: 33px;
`;
const ProjectDetailProgressBox = styled.div``;

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
    { id: 1, name: "승연", img: "/Icon/Modal/ModalExit.pg" },
    { id: 2, name: "연준", img: "/Icon/Modal/ModalExit.pg" },
    { id: 3, name: "승찬", img: "/Icon/Modal/ModalExit.pg" },
  ]);

  const [allList, setallList] = useState([
    {
      planedList: [
        { id: 1, name: "일1", img: "/Icon/Modal/ModalExit.pg" },
        { id: 2, name: "일2", img: "/Icon/Modal/ModalExit.pg" },
        { id: 3, name: "일3", img: "/Icon/Modal/ModalExit.pg" },
      ],
    },
    {
      progressList: [
        { id: 4, name: "일4", img: "/Icon/Modal/ModalExit.pg" },
        { id: 5, name: "일5", img: "/Icon/Modal/ModalExit.pg" },
        { id: 6, name: "일6", img: "/Icon/Modal/ModalExit.pg" },
      ],
    },
    {
      completeList: [
        { id: 7, name: "일7", img: "/Icon/Modal/ModalExit.pg" },
        { id: 8, name: "일8", img: "/Icon/Modal/ModalExit.pg" },
        { id: 9, name: "일9", img: "/Icon/Modal/ModalExit.pg" },
      ],
    },
  ]);

  const HeaderText: string = data?.body.project_info.title;

  const setModal = useSetRecoilState(Modal);

  const handleChange = (result: any) => {
    if (!result.destination) return;
    console.log(result.source);
    console.log(allList[1]);
    const items = [...allList];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setallList(items);
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
        {
          <ProjectProgressList>
            {allList.map((e: any, i: number) => {
              return Object.values(e).map((item: any, index: number) => {
                return (
                  <ProjectDetailProgressBox>
                    <ProjectProgressHeader>
                      {Object.keys(e)[0]}
                    </ProjectProgressHeader>
                    <Droppable droppableId={Object.keys(e)[0]}>
                      {(provided: any) => (
                        <ProejctDetailProgressLayout>
                          <div
                            className="planlists"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {provided.placeholder}
                            {
                              // item.map((list: any, li: number) => {
                              <Draggable
                                draggableId={`test-${i}`}
                                index={i}
                                key={`test-${i}`}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                      className="planlistsitem"
                                    >
                                      {`테스트${i}`}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            }
                          </div>
                        </ProejctDetailProgressLayout>
                      )}
                    </Droppable>
                  </ProjectDetailProgressBox>
                );
              });
            })}
          </ProjectProgressList>
        }
      </DragDropContext>
    </ProjectDetailMainPageBox>
  );
};

export default ProjectDeatailMainPage;
