import NextPlanMainPage from "@/organisms/NextPlan/NextPlanMainPage";
import { GlobalModal, SidebarLayout } from "@/reocoil";
import styled from "styled-components";
import { useRecoilValue } from "recoil";

const NextPageLayoutBox = styled.div<{ open: boolean | null }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  animation: 0.7s
    ${(prop) =>
      prop.open !== null && prop.open ? "PopUpCalendar" : "PopOutCalendar"}
    forwards;

  @keyframes PopUpCalendar {
    0% {
      transform: translate(-9.3%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutCalendar {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-9.3%, 0);
    }
  }
`;

const NextPageLayout = () => {
  const SToogleState = useRecoilValue(SidebarLayout);

  return (
    <>
      <NextPageLayoutBox open={SToogleState.sidebartoggle}>
        <NextPlanMainPage />
      </NextPageLayoutBox>
    </>
  );
};

export default NextPageLayout;
