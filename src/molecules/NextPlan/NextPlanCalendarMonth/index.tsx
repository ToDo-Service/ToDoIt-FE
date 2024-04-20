import { media } from "@/styles/media";
import styled from "styled-components";

const MonthPage = styled.div`
  height: 602px;

  ${media.phone`
      width: 95vw;
  `}
`;

const NextPlanCalendarMonth = ({ month, index }: any) => {
  return <MonthPage>{month}</MonthPage>;
};

export default NextPlanCalendarMonth;
