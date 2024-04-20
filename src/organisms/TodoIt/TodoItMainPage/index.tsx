import KanbanList from "@/molecules/KanbanList";
import TodoBox from "@/molecules/TO-DO/TodoBox";
import { FC, ReactElement } from "react";
import styled from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { media } from "@/styles/media";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 297px;
  margin-top: 110px;

  & section:last-child {
    margin-left: 48px;
    ${media.phone`
        order:1;
        margin-left: 0;
    `}
  }
  & section:first-child {
    margin-left: 48px;
    ${media.phone`
        order:2;
        margin-left: 0;
    `}
  }

  ${media.phone`
    flex-direction: column;  
    width: 100vw;
    margin-left:20%;
    margin-top:20%;
    & section:last-child {
    margin-left: 0;
  }
  `}
`;

interface PriorityList {
  [key: string]: number;
}

const PageTemp: FC<any> = ({ Data }) => {
  const cardDataHandlertest = (cardTitle: string) => {
    const TodoBoxes: Array<ReactElement> = [];
    const PriorityList: PriorityList = { 높음: 1, 보통: 2, 낮음: 3 };
    Data &&
      Object.keys(Data.body).forEach((key) => {
        key === cardTitle &&
          Data.body[key].map((item: any, index: number) => {
            Object.keys(PriorityList).forEach((e: string) => {
              item.priority === e &&
                TodoBoxes.push(
                  <TodoBox
                    key={item.id}
                    Data={item}
                    category={key}
                    rank={PriorityList[e]}
                  />
                );
            });
          });
      });

    TodoBoxes.sort((a, b) => a.props.rank - b.props.rank);

    return TodoBoxes;
  };

  return (
    <div>
      <TodoPageMainBox>
        <DndProvider backend={HTML5Backend}>
          {Data &&
            Object.keys(Data.body).map((key) => {
              return (
                <KanbanList title={`${key}`}>
                  {cardDataHandlertest(key)}
                </KanbanList>
              );
            })}
        </DndProvider>
      </TodoPageMainBox>
    </div>
  );
};

export default PageTemp;
