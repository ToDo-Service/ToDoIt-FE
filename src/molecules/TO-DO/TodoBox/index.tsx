import styled from "styled-components";
import HashtagPriority from "@/atoms/Hashtag/H_Priority";
import HashtagProject from "@/atoms/Hashtag/H_Project";
import { useDrag } from "react-dnd";
import { useRecoilState } from "recoil";
import { kanbanListState } from "@/reocoil";
import { useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { DragSourceMonitor } from "react-dnd";
import axios from "axios";
import useSWR, { mutate } from "swr";
import Fetcher from "@/utils/fetcher";

interface DargProps {
  isdragging: any;
}

const TodoContainer = styled.article`
  filter: drop-shadow(1px 2px 4px #c5c5c5);
  border: 0.5px solid #c8c5cb;
  border-radius: 16px;
`;

const TodoMainBox = styled.div<DargProps>`
  width: 100%;
  height: 125px;
  padding-top: 20px;
  padding-left: 23px;
  opacity: ${(props) => (props.isdragging ? "0.3" : "1")};
`;

const CheckBox = styled.input`
  appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 1.5px solid gainsboro;
  border-radius: 50%;

  &:checked {
    border-color: transparent;
    background-image: url("/Icon/Checkcircle_fill.png");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;

const TodoLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const TodoBoxHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TodoBoxName = styled.span`
  margin-left: 10px;
  font-family: "Pretendard";
  font-size: 16px;
  color: rgba(0, 0, 0, 0.8);
`;

const TodoBoxDate = styled.span`
  margin-left: 5px;
  font-family: "Pretendard";
  font-size: 12px;
  color: rgba(0, 0, 0, 0.2);
`;

const TodoBoxDetail = styled.div`
  margin-left: 27px;
  color: rgba(0, 0, 0, 0.5);
  font-size: 16px;
  font-family: "Pretendard";
`;

const TodoBoxHashTagBox = styled.div`
  display: flex;
  align-items: center;
  margin-top: 16.5px;
  width: 201px;
  margin-left: 27px;
  justify-content: space-between;
`;

const ExitBtn = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 21px;
`;

const TodoBox = ({ Data, category }: any) => {
  const JwtToken = useRecoilValue(jwtToken);
  const { data, error, isLoading } = useSWR(
    "https://laoh.site/api/todos/today",
    (url) => Fetcher(url, JwtToken)
  );

  const CompleteTodo = async () => {
    await axios
      .patch(`https://laoh.site/api/todos/status/${Data.id}`, null, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
          withCredentials: true,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const changeItemCategory = (selectedItem: any, title: string) => {
    console.log(selectedItem, title);
    console.log(Data.id);
    axios
      .patch(
        `https://laoh.site/api/todos/${Data.id}`,
        {
          title: Data.title,
          content: Data.content,
          end_date: Data.end_Date,
          project_id: null,
          priority: Data.priority,
          push_status: false,
        },
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
            withCredentials: true,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const deleteItem = () => {
    axios
      .delete(`https://laoh.site/api/todos/${Data.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${JwtToken}` },
      })
      .then(() => mutate("https://laoh.site/api/todos/today"))
      .catch((err) => console.log(err));
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: Data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: any, monitor: DragSourceMonitor) => {
      const dropResult: any | null = monitor.getDropResult();
      if (dropResult) {
        switch (dropResult.name) {
          case "past_todos":
            changeItemCategory(item, "past_todos");
            break;
          case "today_todos":
            changeItemCategory(item, "today_todos");
            break;
        }
      }
    },
  }));

  return (
    <TodoContainer>
      <TodoMainBox ref={dragRef} isdragging={isDragging ? 1 : 0}>
        <TodoBoxHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TodoLabel htmlFor="check">
              {data.status == "INCOMPLETE" ? (
                <CheckBox
                  type="checkbox"
                  id="1"
                  name="check"
                  onChange={CompleteTodo}
                />
              ) : (
                <CheckBox
                  type="checkbox"
                  id="1"
                  name="check"
                  onChange={CompleteTodo}
                />
              )}
            </TodoLabel>
            <TodoBoxName>{Data.title}</TodoBoxName>
            <TodoBoxDate>{Data.end_Date}</TodoBoxDate>
          </div>
          <ExitBtn src="/Icon/ModalExit.png" alt="/" onClick={deleteItem} />
        </TodoBoxHeader>
        <TodoBoxDetail>{Data.content}</TodoBoxDetail>
        <TodoBoxHashTagBox>
          <HashtagPriority priority={Data.priority} />
          <HashtagProject project={Data.project ? data.project : null} />
        </TodoBoxHashTagBox>
      </TodoMainBox>
    </TodoContainer>
  );
};

export default TodoBox;
