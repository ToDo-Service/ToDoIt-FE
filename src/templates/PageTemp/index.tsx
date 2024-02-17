import KanbanList from "@/atoms/KanbanList";
import Header from "@/organisms/Header";

import TodoBox from "@/molecules/TO-DO/TodoBox";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { kanbanListState } from "@/reocoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TodoModal from "@/organisms/TodoModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { jwtToken } from "@/reocoil";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
`;

const PageTemp = () => {
  const [HeaderName, setHeaderName] = useState(["오늘의 할 일 "]);

  const [kanbanList, setKanbanList] = useRecoilState(kanbanListState);
  const { data: session } = useSession();
  const setJWT = useSetRecoilState(jwtToken);
  const JWT = useRecoilValue(jwtToken);

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

  const { data, error, isLoading } = useSWR(
    "https://laoh.site/api/todos/today",
    (url) => fetcher(url, JWT)
  );

  useEffect(() => {
    data
      ? Object.keys(data.body).forEach((key) => {
          data.body[key].map((e: any) => {
            e.end_date === todayform
              ? setKanbanList((prev) => [
                  ...prev,
                  {
                    id: e.id,
                    title: e.title,
                    content: e.content,
                    priority: e.priority,
                    endDate: e.end_date,
                    category: "today_todos",
                  },
                ])
              : setKanbanList((prev) => [
                  ...prev,
                  {
                    id: e.id,
                    title: e.title,
                    content: e.content,
                    priority: e.priority,
                    endDate: e.end_date,
                    category: "past_todos",
                  },
                ]);
          });
        })
      : null;
  }, [data]);

  console.log(kanbanList);

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

  //로그인 토큰 전송
  useEffect(() => {
    axios
      .post("https://laoh.site/api/auth/social/kakao", null, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      })
      .then((res) => {
        console.log("전송 완료");
        setJWT(res.data.body.user.access_token);
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => {});
  }, [session]);

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
