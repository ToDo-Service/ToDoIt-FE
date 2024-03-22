import KanbanList from "@/atoms/KanbanList";
import Header from "@/organisms/TodoIt/TodoItHeader";
import TodoBox from "@/molecules/TO-DO/TodoBox";
import { ReactElement, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
// import { kanbanListState } from "@/reocoil";
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
  const [HeaderName, setHeaderName] = useState(["오늘 할 일 "]);

  //현재 날짜
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();
  let todayform = "";

  month < 10
    ? (todayform = `${year}-0${month}-${date}`)
    : (todayform = `${year}-${month}-${date}`);

  var weekday = new Array(7);
  weekday[0] = "일";
  weekday[1] = "월";
  weekday[2] = "화";
  weekday[3] = "수";
  weekday[4] = "목";
  weekday[5] = "금";
  weekday[6] = "토";
  let todayformday = `${month}월 ${date}일 (${weekday[day]})`;

  const cardDataHandlertest = (cardTitle: string) => {
    const todoBoxes: Array<ReactElement> = [];
    const PriorityList: PriorityList = { 높음: 1, 보통: 2, 낮음: 3 };
    data
      ? Object.keys(data.body).forEach((key) => {
          key === cardTitle
            ? data.body[key].map((item: any) => {
                Object.keys(PriorityList).forEach((e: string) => {
                  item.priority === e
                    ? todoBoxes.push(
                        <TodoBox
                          key={item.id}
                          Data={item}
                          category={key}
                          rank={PriorityList[e]}
                        />
                      )
                    : null;
                });
              })
            : null;
        })
      : null;
    todoBoxes.sort((a, b) => a.props.rank - b.props.rank);

    return todoBoxes;
  };

  return (
    <div>
      <Header Headername={HeaderName[0]} />
      <TodoPageMainBox>
        <DndProvider backend={HTML5Backend}>
          {data
            ? Object.keys(data.body).map((key) => {
                return (
                  <KanbanList title={`${key}`}>
                    {cardDataHandlertest(key)}
                  </KanbanList>
                );
              })
            : null}
        </DndProvider>
      </TodoPageMainBox>
    </div>
  );
};

export default PageTemp;
