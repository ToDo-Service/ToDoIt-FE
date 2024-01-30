import styled from "styled-components";
import Hashtag from "@/atoms/Hashtag";

const TodoMainBox = styled.div`
  border-radius: 16px;
  width: 376px;
  height: 125px;
  border: 0.5px solid #c8c5cb;
  filter: drop-shadow(1px 2px 4 #c5c5c5);
  padding-top: 20px;
  padding-left: 23px;
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

const TodoBox = () => {
  return (
    <article>
      <TodoMainBox>
        <TodoBoxHeader>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TodoLabel htmlFor="check">
              <CheckBox type="checkbox" id="1" name="check" />
            </TodoLabel>
            <TodoBoxName>운동하기</TodoBoxName>
            <TodoBoxDate>날짜</TodoBoxDate>
          </div>
        </TodoBoxHeader>
        <TodoBoxDetail>멋드러지게 운동하기</TodoBoxDetail>
        <Hashtag />
      </TodoMainBox>
    </article>
  );
};

export default TodoBox;
