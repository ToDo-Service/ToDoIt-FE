import NextPlanMainPage from "@/organisms/NextPlan/NextPlanMainPage";
import { GlobalModal } from "@/reocoil";
import styled from "styled-components";
import { useRecoilCallback, useRecoilValue } from "recoil";
import { useEffect } from "react";

const NextPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const NextPageLayout = () => {
  const Modal = useRecoilValue(GlobalModal);
  const resetModalState = useRecoilCallback(({ reset }) => () => {
    reset(Modal);
  });

  useEffect(() => {
    window.addEventListener("beforeunload", () => resetModalState);
    return () => {
      window.removeEventListener("beforeunload", () => resetModalState);
    };
  }, []);

  return (
    <>
      <NextPageLayoutBox>
        <NextPlanMainPage />
      </NextPageLayoutBox>
    </>
  );
};

export default NextPageLayout;
