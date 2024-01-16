import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

const TodaySchedueBox = styled.section`
  & span {
    margin-left: 16px;
  }
  & .BookmarkCheck {
    margin-left: 1vw;
  }
`;

const TodaySchedule = () => {
  return (
    <TodaySchedueBox>
      <Icon.BookmarkCheck className="BookmarkCheck" />
      <span>오늘 할 일</span>
    </TodaySchedueBox>
  );
};

export default TodaySchedule;
