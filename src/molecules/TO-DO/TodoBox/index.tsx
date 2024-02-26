import styled from "styled-components";
import HashtagPriority from "@/atoms/Hashtag/H_Priority";
import HashtagProject from "@/atoms/Hashtag/H_Project";
import { useDrag } from "react-dnd";
import RewriteModalComponent from "@/organisms/RewriteModal";
import { useRecoilValue } from "recoil";
import { jwtToken } from "@/reocoil";
import { DragSourceMonitor } from "react-dnd";
import axios from "axios";
import useSWR, { mutate } from "swr";
import Fetcher from "@/utils/fetcher";
import { useState } from "react";

interface DargProps {
  isdragging: any;
}

const TodoContainer = styled.article`
  filter: drop-shadow(1px 2px 4px #c5c5c5);
  border: 0.5px solid #c8c5cb;
  border-radius: 16px;
  width: 376px;
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
  border: 1px solid black;
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
  const [rewriteModal, setRewriteModal] = useState(false);

  const CompleteTodo = async () => {
    await axios
      .patch(`https://laoh.site/api/todos/status/${Data.id}`, Data.id, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
          withCredentials: true,
        },
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const changeItemCategory = (selectedItem: any, title: string) => {
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

  const RewriteModal = () => {
    setRewriteModal(!rewriteModal);
  };

  return (
    <TodoContainer onClick={RewriteModal}>
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
            <TodoBoxDate>{Data.end_date}</TodoBoxDate>
          </div>
          <ExitBtn src="/Icon/ModalExit.png" alt="/" onClick={deleteItem} />
        </TodoBoxHeader>
        <TodoBoxDetail>{Data.content}</TodoBoxDetail>
        <TodoBoxHashTagBox>
          <HashtagPriority priority={Data.priority} />
          <HashtagProject project={Data.project ? data.project : null} />
        </TodoBoxHashTagBox>
      </TodoMainBox>
      {rewriteModal ? <RewriteModalComponent status={rewriteModal} /> : null}
    </TodoContainer>
  );
};

export default TodoBox;
