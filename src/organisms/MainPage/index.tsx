import KanbanList from "@/atoms/KanbanList";
import Header from "@/organisms/Header";
import TodoBox from "@/molecules/TO-DO/TodoBox";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { kanbanListState } from "@/reocoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import useSWR from "swr";
import Fetcher from "@/utils/fetcher";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
`;

const PageTemp = ({ data }: any) => {
  const [HeaderName, setHeaderName] = useState(["오늘의 할 일 "]);

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
    const todoBoxes: any = [];
    console.log(cardTitle);
    data
      ? Object.keys(data.body).forEach((key) => {
          key === cardTitle
            ? data.body[key].map((item: any) =>
                todoBoxes.push(
                  <TodoBox key={item.id} Data={item} category={key} />
                )
              )
            : null;
        })
      : null;
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
