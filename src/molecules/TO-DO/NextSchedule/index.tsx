import * as Icon from "react-bootstrap-icons";
import styled from "styled-components";

const NextSchedueBox = styled.section`
  & span {
    margin-left: 2px;
  }
`;

const NextSchedule = () => {
  return (
    <NextSchedueBox>
      <span>월간 할 일</span>
    </NextSchedueBox>
  );
};

export default NextSchedule;
