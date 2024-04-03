import NextPlanCalendar from "@/molecules/NextPlan/NextPlanCalendar";
import NextPlanModal from "@/molecules/NextPlan/NextPlanModal";
import styled from "styled-components";

const NextPlanMainBox = styled.div`
  display: flex;
  margin-left: 270px;
  margin-top: 110px;
  position: relative;
  font-family: "PretendardVariable";
  font-weight: 250;
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
