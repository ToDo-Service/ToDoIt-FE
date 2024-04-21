import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

const TodaySchedueBox = styled.section`
  & span {
    margin-left: 2px;
  }
`;

const TodaySchedule = () => {
  return (
    <TodaySchedueBox>
      <span>오늘 할 일</span>
    </TodaySchedueBox>
  );
};

export default TodaySchedule;
