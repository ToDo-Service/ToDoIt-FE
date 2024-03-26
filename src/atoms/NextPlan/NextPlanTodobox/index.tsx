import styled from "styled-components";

const NextPlanTodoboxMainbox = styled.article<{ bgColor: string }>`
  margin: 0 auto;
  padding: 0;
  width: 23.9583vw;
  height: 7.2266vh;
  background-color: ${(props) => props.bgColor};
  border: 1px solid rgba(12, 0, 24, 0.1);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NextPlanTodoboxHeader = styled.header`
  display: flex;
  font-family: "Pretendard";
  width: 100%;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  & h6 {
    font-size: 15px;
  }
`;
const NextPlanTodoboxContent = styled.p`
  height: 60%;
  width: 19.9306vw;
`;

const NextPlanTodobox = (props: any) => {
  return (
    <NextPlanTodoboxMainbox bgColor="rgba(255,189,62,0.15)">
      <NextPlanTodoboxContent>
        <NextPlanTodoboxHeader>
          <h6>운동하기</h6>
          <div role="checkbox">체크박스</div>
        </NextPlanTodoboxHeader>
        <div>{props.item}</div>
      </NextPlanTodoboxContent>
    </NextPlanTodoboxMainbox>
  );
};

export default NextPlanTodobox;
