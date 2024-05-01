import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

const TodaySchedueBox = styled.section`
  & span {
    margin-left: 2px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    font-family: "PretendardVariable";
    font-weight: 350;
  }
`;

const TodaySchedule = () => {
  return (
    <TodaySchedueBox>
      <span>오늘</span>
    </TodaySchedueBox>
  );
};

export default TodaySchedule;
