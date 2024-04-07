import styled from "styled-components";
import HashtagPriority from "@/atoms/Hashtag/H_Priority";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Modal, UpdateData, jwtToken } from "@/reocoil";
import axios from "axios";
import useSWR, { mutate } from "swr";
import * as Icon from "react-bootstrap-icons";

import { useToast } from "@/hooks/useToast";
import HashtagProjectEndDate from "@/atoms/Hashtag/H_ProejctEndDate";

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
  margin-bottom: 15px;
`;

const TodoMainBox = styled.div`
  position: relative;
  width: 100%;
  height: 125px;
  padding-top: 20px;
  padding-left: 23px;
  border-radius: 16px;
  border: 0.5px solid #c8c5cb;

  transition: 0.3s ease-in-out;

  &:hover .MoveIcon {
    display: block;
  }

  & .PencilIcon {
    border-radius: 5px;
    display: none;
    position: absolute;
    left: 23px;
    top: 50px;
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
  justify-content: start;

  & div:nth-child(2) {
    margin-left: 10px;
  }
`;

const ExitBtn = styled.img`
  width: 14px;
  height: 14px;
  margin-right: 21px;
  cursor: pointer;
`;

interface TodoItem {
  content: string;
  end_date: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}

interface Props {
  todolist: TodoItem;
}

const ProjectDetailTodoBox: React.FC<Props> = ({ todolist }) => {
  const JwtToken = useRecoilValue(jwtToken);

  const CompleteTodo = async () => {
    await axios
      .patch(`https://laoh.site/api/todos/status/${todolist.id}`, null, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        console.log();
        res.data.body === "complete"
          ? useToast(`${todolist.title} 완료 하셨군요`, true)
          : useToast(`${todolist.title} 취소 하였습니다.`, true);

        mutate("https://laoh.site/api/todos/today");
      })
      .catch((err) => {
        console.log(err);
        useToast("실패", false);
      });
  };

  const deleteItem = () => {
    axios
      .delete(`https://laoh.site/api/todos/${todolist.id}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${JwtToken}` },
      })
      .then(() => {
        mutate("https://laoh.site/api/todos/today");
        useToast(`${todolist.title} 삭제 하겠습니다`, true);
      })
      .catch((err) => useToast("실패", false));
  };

  return (
    <>
      <TodoContainer>
        <TodoMainBox>
          <Icon.Pencil className="PencilIcon" />
          <TodoBoxHeader>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TodoLabel htmlFor="check">
                {todolist ? (
                  todolist.status === "INCOMPLETE" ? (
                    <CheckBox
                      type="checkbox"
                      name="check"
                      onClick={CompleteTodo}
                    />
                  ) : (
                    <CheckBox
                      type="checkbox"
                      name="check"
                      checked
                      onClick={CompleteTodo}
                    />
                  )
                ) : null}
              </TodoLabel>
              <TodoBoxName>{todolist.title}</TodoBoxName>
              <TodoBoxDate>{todolist.end_date}</TodoBoxDate>
            </div>
            <ExitBtn
              src="/Icon/Modal/ModalExit.png"
              alt="/"
              onClick={deleteItem}
            />
          </TodoBoxHeader>
          <TodoBoxDetail>{todolist.content}</TodoBoxDetail>
          <TodoBoxHashTagBox>
            <HashtagPriority priority={todolist.priority} />
            <HashtagProjectEndDate />
          </TodoBoxHashTagBox>
        </TodoMainBox>
      </TodoContainer>
    </>
  );
};

export default ProjectDetailTodoBox;
