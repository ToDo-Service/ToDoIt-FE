import styled from "styled-components";

const MonthPage = styled.div`
  /* margin-top: 50px; */
  height: 602px;
`;

const NextPlanCalendarMonth = ({ month, index }: any) => {
  return <MonthPage>{month}</MonthPage>;
};

export default NextPlanCalendarMonth;
