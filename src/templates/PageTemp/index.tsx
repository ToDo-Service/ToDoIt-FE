import KanbanList from "@/atoms/KanbanList";
import Header from "@/organisms/Header";
import TodoList from "@/organisms/TodoRecent";
import TodoToday from "@/organisms/TodoToday";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { kanbanListState } from "@/reocoil";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import TodoModal from "@/molecules/TO-DO/TodoModal";
import { useSession } from "next-auth/react";
import axios from "axios";
import { jwtToken } from "@/reocoil";

const TodoPageMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
`;

const PageTemp = () => {
  const [HeaderName, setHeaderName] = useState(["오늘의 할 일 "]);
  const { data: session } = useSession();
  const setJWT = useSetRecoilState(jwtToken);

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

  const titleName = [
    { id: 1, title: "지난 일정" },
    { id: 2, title: "오늘 일정" },
  ];

  // const cardDataHandler = (cardTitle: string) => {
  //   return kanbanList
  //     .filter((data) => data.category === cardTitle)
  //     .map((item, index) => <TodoBox key={item.id} item={item} />);
  // };

  return (
    <div>
      <Header Headername={HeaderName[0]} />
      <TodoPageMainBox>
        <DndProvider backend={HTML5Backend}>
          {titleName.map((data: any) => {
            return (
              <KanbanList title={`${data.title}`} id={data.id}>
                {/* {cardDataHandler(data.title)} */}
              </KanbanList>
            );
          })}
          <TodoModal />
        </DndProvider>
      </TodoPageMainBox>
    </div>
  );
};

export default PageTemp;
