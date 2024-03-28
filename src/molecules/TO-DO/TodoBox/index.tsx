import styled from "styled-components";
import HashtagPriority from "@/atoms/Hashtag/H_Priority";
import HashtagProject from "@/atoms/Hashtag/H_Project";
import { useDrag } from "react-dnd";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, UpdateData, jwtToken } from "@/reocoil";
import { DragSourceMonitor } from "react-dnd";
import axios from "axios";
import useSWR, { mutate } from "swr";
import * as Icon from "react-bootstrap-icons";
import { useState } from "react";
import dayjs from "dayjs";
import { useToast } from "@/hooks/useToast";

interface DargProps {
  isdragging: any;
}

const TodoContainer = styled.article`
  filter: drop-shadow(1px 2px 4px #c5c5c5);
  cursor: pointer;
  width: 320px;
  max-width: fit-content;
  min-width: 320px;
  position: relative;
`;

const TodoMainBox = styled.div<DargProps>`
  position: relative;
  width: 100%;
  height: 125px;
  padding-top: 20px;
  padding-left: 23px;
  opacity: ${(props) => (props.isdragging ? "0" : "1")};
  border-radius: 16px;
  border: ${(props) => (props.isdragging ? "none" : "0.5px solid #c8c5cb")};
  transition: 0.3s ease-in-out;
  & .MoveIcon {
    display: none;
    position: absolute;
    left: 23px;
    top: 50px;
    transition: 0.5s ease-in-out;
    border-radius: 5px;
  }

  & .MoveIcon:hover {
    background-color: #d2d2d2;
  }

  & .MoveIcon:active {
    background-color: #d2d2d2;
  }

  &:hover .MoveIcon {
    display: block;
  }

  & .PencilIcon {
    border-radius: 5px;
    display: none;
    position: absolute;
    left: 23px;
    top: 73px;
    transition: 0.5s ease-in-out;
  }

  & .PencilIcon:hover {
    background-color: #d2d2d2;
  }

  & .PencilIcon:active {
    background-color: #d2d2d2;
  }

  &:hover .PencilIcon {
    display: block;
  }
`;

const CheckBox = styled.input`
  cursor: pointer;
  transition: 0.5s ease-in-out;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 0.7px solid black;
  border-radius: 50%;

  &:checked {
    border-color: transparent;
    background-image: url("/Icon/Todoit/Checkcircle_fill.png");
    width: 18px;
    height: 18px;
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
  width: 201px;
  overflow: hidden;
  //css 글 자수 초과
  text-overflow: ellipsis;
  white-space: nowrap;
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
  justify-content: space-evenly;
`;

const ExitBtn = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 21px;
  cursor: pointer;
`;

const TodoBox = ({ Data, category }: any) => {
  const JwtToken = useRecoilValue(jwtToken);
  const setModal = useSetRecoilState(Modal);
  const setUData = useSetRecoilState(UpdateData);
  const [check, setCheck] = useState(Data.status === "COMPLETE" ? true : false);

  const CompleteTodo = async () => {
    setCheck(!check);
    await axios
      .patch(`https://laoh.site/api/todos/status/${Data.id}`, null, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        res.data.body === "complete"
          ? useToast(`${Data.title} 완료 하셨군요`, true)
          : useToast(`${Data.title} 취소 하였습니다.`, true);
        mutate("https://laoh.site/api/todos/today");
      })
      .catch((err) => {
        console.log(err);
        useToast("실패", false);
      });
  };

  const changeItemCategory = (selectedItem: any, title: string) => {
    axios
      .patch(
        `https://laoh.site/api/todos/${Data.id}`,
        {
          title: Data.title,
          content: Data.content,
          end_date: dayjs().format("YYYY.MM.DD"),
          project_id: null,
          priority: Data.priority,
          push_status: false,
        },
        {
          headers: {
            Authorization: `Bearer ${JwtToken}`,
          },
          withCredentials: true,
        }
      )
      .then(() => {
        useToast(`일정 추가`, true);
        mutate("https://laoh.site/api/todos/today");
      })
      .catch((err) => {
        console.log(err);
        useToast("실패", false);
      });
  };

  const deleteItem = () => {
    axios
      .delete(`https://laoh.site/api/todos/${Data.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${JwtToken}` },
      })
      .then(() => {
        mutate("https://laoh.site/api/todos/today");
        useToast(`${Data.title} 삭제 하겠습니다`, true);
      })
      .catch((err) => useToast("실패", false));
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
          case "today_todos":
            changeItemCategory(item, "today_todos");
            break;
        }
      }
    },
  }));

  const RewriteModal = () => {
    setUData({
      id: Data.id,
      title: Data.title,
      content: Data.content,
      end_date: Data.end_date,
      status: Data.status,
      priority: Data.priority,
      project: Data.project,
    });
    setModal({ id: Data.id, method: "update", toggle: true });
  };

  return (
    <>
      <TodoContainer ref={dragRef}>
        <TodoMainBox isdragging={isDragging ? 1 : 0}>
          <Icon.Activity className="MoveIcon" />
          <Icon.Pencil className="PencilIcon" onClick={RewriteModal} />
          <TodoBoxHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TodoLabel htmlFor="check">
                {
                  <CheckBox
                    type="checkbox"
                    onChange={CompleteTodo}
                    checked={check}
                  />
                }
              </TodoLabel>
              <TodoBoxName>{Data.title}</TodoBoxName>
              <TodoBoxDate>{Data.end_date}</TodoBoxDate>
            </div>
            <ExitBtn
              src="/Icon/Modal/ModalExit.png"
              alt="/"
              onClick={deleteItem}
            />
          </TodoBoxHeader>
          <TodoBoxDetail>{Data.content}</TodoBoxDetail>
          <TodoBoxHashTagBox>
            <HashtagPriority priority={Data.priority} />
            <HashtagProject project={Data.project} />
          </TodoBoxHashTagBox>
        </TodoMainBox>
      </TodoContainer>
    </>
  );
};

export default TodoBox;
