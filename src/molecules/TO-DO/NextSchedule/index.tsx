import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

const NextSchedueBox = styled.section`
  & span {
    margin-left: 16px;
  }
  & .CalendarEvent {
    margin-left: 1vw;
  }
`;

const NextSchedule = () => {
  return (
    <NextSchedueBox>
      <span>계획된 할 일</span>
    </NextSchedueBox>
  );
};

export default NextSchedule;
