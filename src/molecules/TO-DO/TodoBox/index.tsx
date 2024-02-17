import styled from "styled-components";
import Hashtag from "@/atoms/Hashtag";
import { useDrag } from "react-dnd";
import { useRecoilState } from "recoil";
import { kanbanListState } from "@/reocoil";
import { useRef } from "react";

const TodoContainer = styled.article`
  filter: drop-shadow(1px 2px 4px #c5c5c5);
  border: 0.5px solid #c8c5cb;
  border-radius: 16px;
  
`;

const TodoMainBox = styled.div<{ isDragging: boolean }>`
  width: 100%;
  height: 125px;
  padding-top: 20px;
  padding-left: 23px;
  opacity: ${(props) => (props.isDragging ? "0.3" : "1")};
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

const TodoBox = ({ data }: any) => {
  const [list, setList] = useRecoilState(kanbanListState);

  // const index = list.findIndex((data) => data === item);
  const ref = useRef<HTMLTextAreaElement>(null);

  const replaceIndex = (list: any, index: number, data: any) => {
    return [...list.slice(0, index), data, ...list.slice(index + 1)];
  };

  const changeItemCategory = (selectedItem: any, title: string) => {
    console.log(selectedItem, title);
    setList((prev) => {
      return prev.map((e) => {
        console.log(e);
        return {
          ...e,
          category: e.id === selectedItem.id ? title : e.category,
        };
      });
    });
  };

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "card",
    item: data,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: any, monitor) => {
      const dropResult: any | null = monitor.getDropResult();
      console.log(dropResult.name);
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
      <TodoMainBox ref={dragRef} isDragging={isDragging}>
        <TodoBoxHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TodoLabel htmlFor="check">
              {data.status == "INCOMPLETE" ? (
                <CheckBox type="checkbox" id="1" name="check" />
              ) : (
                <CheckBox type="checkbox" id="1" name="check" checked />
              )}
            </TodoLabel>
            <TodoBoxName>{data.title}</TodoBoxName>
            <TodoBoxDate>{data.endDate}</TodoBoxDate>
          </div>
        </TodoBoxHeader>
        <TodoBoxDetail>{data.content}</TodoBoxDetail>
        <Hashtag />
      </TodoMainBox>
    </TodoContainer>
  );
};

export default TodoBox;
