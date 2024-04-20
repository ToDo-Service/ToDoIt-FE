import { useToast } from "@/hooks/useToast";
import { jwtToken } from "@/reocoil";
import axios from "axios";
import { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { mutate } from "swr";
import { media } from "@/styles/media";

const NextPlanTodoboxMainbox = styled.article<{ bgColor: string }>`
  margin: 0 auto;
  padding: 0;
  /* width: 23.9583vw;
  height: 7.2266vh; */
  width: 345px;
  height: 74px;
  /* max-width: 345px;
  max-height: 74px; */
  background-color: ${(props) => props.bgColor};
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${media.phone`
  widtH: 270px;
  `}
`;

const NextPlanTodoboxHeader = styled.header`
  display: flex;

  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;

  & h6 {
    font-size: 15px;
  }

  ${media.phone`
    width: 90%;
    
  `}
`;

const CheckBox = styled.input`
  cursor: pointer;
  transition: 0.5s ease-in-out;
  appearance: none;
  width: 16px;
  height: 16px;
  border: 0.7px solid black;
  border-radius: 50%;
  z-index: 99;

  &:checked {
    border-color: transparent;
    background-image: url("/Icon/Todoit/Checkcircle_fill.png");
    width: 16px;
    height: 16px;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
  }
`;
const NextPlanTodoboxContent = styled.div`
  height: 35px;
  width: 287px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1;

  ${media.phone`
    width: 250px;
  `}
`;

const NextPlanTodoboxText = styled.span`
  font-family: "PretendardVariable";
  font-weight: 250;
  opacity: 0.5;
`;

const NextPlanTodoboxHeaderText = styled.div`
  font-family: "PretendardVariable";
  font-weight: 250;
  opacity: 0.8;
`;

interface TodoProps {
  item: {
    status: string;
    id: number;
    title: string;
    content: string;
  };
}

const NextPlanTodobox: FC<TodoProps> = (props) => {
  const [check, setCheck] = useState(
    props.item.status === "COMPLETE" ? true : false
  );
  const JwtToken = useRecoilValue(jwtToken);

  const CompleteTodo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setCheck(!check);
    await axios
      .patch(`https://laoh.site/api/todos/status/${props.item.id}`, null, {
        headers: {
          Authorization: `Bearer ${JwtToken}`,
        },
        withCredentials: true,
      })
      .then((res) => {
        res.data.body === "complete"
          ? useToast(`${props.item.title} 완료 하셨군요`, true)
          : useToast(`${props.item.title} 취소 하였습니다.`, true);
        mutate("https://laoh.site/api/todos/today");
      })
      .catch((err) => {
        console.log(err);
        useToast("실패", false);
      });
  };

  return (
    <NextPlanTodoboxMainbox bgColor="rgba(255,189,62,0.15)">
      <NextPlanTodoboxContent>
        <NextPlanTodoboxHeader>
          <NextPlanTodoboxHeaderText>
            {props.item.title}
          </NextPlanTodoboxHeaderText>
          <CheckBox
            type="checkbox"
            onClick={(e) => CompleteTodo(e)}
            checked={check}
          />
        </NextPlanTodoboxHeader>
        <NextPlanTodoboxText>{props.item.content}</NextPlanTodoboxText>
      </NextPlanTodoboxContent>
    </NextPlanTodoboxMainbox>
  );
};

export default NextPlanTodobox;
