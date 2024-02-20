import KanbanList from "@/atoms/KanbanList";
import Header from "@/organisms/Header";
import TodoBox from "@/molecules/TO-DO/TodoBox";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { kanbanListState } from "@/reocoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
`;

const PageTemp = ({ data }: any) => {
  const [HeaderName, setHeaderName] = useState(["오늘의 할 일 "]);
  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);

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

  console.log(data);
  console.log(kanbanList);
  useEffect(() => {
    console.log("데이터 추가 감지");
    data && kanbanList.length === 0
      ? Object.keys(data.body).forEach((key) => {
          data.body[key].map((e: any) => {
            if (e.end_date === todayform) {
              setKanbanList((prev) => [
                ...prev,
                {
                  id: e.id,
                  title: e.title,
                  content: e.content,
                  priority: e.priority,
                  endDate: e.end_date,
                  project: e.project,
                  category: "today_todos",
                },
              ]);
            } else {
              setKanbanList((prev) => [
                ...prev,
                {
                  id: e.id,
                  title: e.title,
                  content: e.content,
                  priority: e.priority,
                  endDate: e.end_date,
                  project: e.project,
                  category: "past_todos",
                },
              ]);
            }
          });
        })
      : null;
  }, [data]);

  const titleName = [
    { id: 1, title: "지난 일정", title_en: "past_todos" },
    { id: 2, title: `${todayformday}`, title_en: "today_todos" },
  ];

  const cardDataHandler = (cardTitle: string) => {
    const todoBoxes: any = [];
    kanbanList
      .filter((data) => data.category === cardTitle)
      .map((item, index) =>
        todoBoxes.push(<TodoBox key={item.id} data={item} />)
      );
    return todoBoxes;
  };

  return (
    <div>
      <Header Headername={HeaderName[0]} />
      <TodoPageMainBox>
        <DndProvider backend={HTML5Backend}>
          {data
            ? titleName.map((data: any) => {
                return (
                  <KanbanList
                    title={`${data.title}`}
                    id={data.id}
                    enTitle={`${data.title_en}`}
                  >
                    {cardDataHandler(data.title_en)}
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
