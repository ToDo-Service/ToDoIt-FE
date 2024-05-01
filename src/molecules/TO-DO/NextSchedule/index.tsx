import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

const NextSchedueBox = styled.section`
  & span {
    margin-left: 2px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.8);
    font-family: "PretendardVariable";
    font-weight: 350;
  }
`;

const NextSchedule = () => {
  return (
    <NextSchedueBox>
      <span>캘린더</span>
    </NextSchedueBox>
  );
};

export default NextSchedule;
