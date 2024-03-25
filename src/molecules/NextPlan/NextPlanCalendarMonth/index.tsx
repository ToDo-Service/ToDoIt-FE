import styled from "styled-components";

const MonthPage = styled.div`
  margin-bottom: 300px;
`;

const NextPlanCalendarMonth = ({ month, index }: any) => {
  return <MonthPage>{month}</MonthPage>;
};

export default NextPlanCalendarMonth;
