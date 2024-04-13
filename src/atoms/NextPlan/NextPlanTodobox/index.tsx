import styled from "styled-components";

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

const CheckBox = styled.input`
  cursor: pointer;
  transition: 0.5s ease-in-out;
  appearance: none;
  width: 18px;
  height: 18px;
  border: 0.7px solid black;
  border-radius: 50%;
  z-index: 99;

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
const NextPlanTodoboxContent = styled.div`
  height: 35px;
  width: 287px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 1;
`;

const NextPlanTodobox = (props: any) => {
  return (
    <NextPlanTodoboxMainbox bgColor="rgba(255,189,62,0.15)">
      <NextPlanTodoboxContent>
        <NextPlanTodoboxHeader>
          <div>운동하기</div>
          <CheckBox type="checkbox" role="checkbox" />
        </NextPlanTodoboxHeader>
        <span>{props.item}</span>
      </NextPlanTodoboxContent>
    </NextPlanTodoboxMainbox>
  );
};

export default NextPlanTodobox;
