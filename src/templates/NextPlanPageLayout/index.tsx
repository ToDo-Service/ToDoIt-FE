import NextPlanMainPage from "@/organisms/NextPlan/NextPlanMainPage";
import { GlobalModal, SidebarLayout } from "@/reocoil";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { media } from "@/styles/media";

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

  ${media.phone`
  
    width:120%;
    transition: 0.7s ease-in-out;
      opacity: ${(props: { open: null }) =>
        props.open !== null && props.open ? "0" : "1"} 
  
  `}
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
