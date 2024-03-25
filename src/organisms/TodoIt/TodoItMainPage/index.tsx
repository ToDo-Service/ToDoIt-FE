import KanbanList from "@/molecules/KanbanList";
import TodoBox from "@/molecules/TO-DO/TodoBox";
import { ReactElement, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
`;

interface PriorityList {
  [key: string]: number;
}

const PageTemp = ({ data }: any) => {
  //아이템 위아래

  const cardDataHandlertest = (cardTitle: string) => {
    const todoBoxes: Array<ReactElement> = [];
    const PriorityList: PriorityList = { 높음: 1, 보통: 2, 낮음: 3 };
    data &&
      Object.keys(data.body).forEach((key) => {
        key === cardTitle &&
          data.body[key].map((item: any, index: number) => {
            Object.keys(PriorityList).forEach((e: string) => {
              item.priority === e &&
                todoBoxes.push(
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

    todoBoxes.sort((a, b) => a.props.rank - b.props.rank);

    return todoBoxes;
  };

  return (
    <div>
      <TodoPageMainBox>
        <DndProvider backend={HTML5Backend}>
          {data &&
            Object.keys(data.body).map((key) => {
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
