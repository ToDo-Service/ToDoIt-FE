import NextPlanCalendar from "@/molecules/NextPlan/NextPlanCalendar";
import NextPlanModal from "@/molecules/NextPlan/NextPlanModal";
import styled from "styled-components";
import { media } from "@/styles/media";

const NextPlanMainBox = styled.div`
  display: flex;
  margin-left: 273px;
  margin-top: 110px;
  position: relative;

  ${media.phone`
  
  margin-left: -9%;  
  margin-top: 80px;
  width:120%;
  justify-content: center;
  `}
`;

const NextPlanMainPage = () => {
  return (
    <NextPlanMainBox>
      <NextPlanCalendar />
      <NextPlanModal />
    </NextPlanMainBox>
  );
};

export default NextPlanMainPage;
