import NextPlanMainPage from "@/organisms/NextPlan/NextPlanMainPage";
import styled from "styled-components";

const NextPageLayoutBox = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const NextPageLayout = () => {
  return (
    <>
      <NextPageLayoutBox>
        <NextPlanMainPage />
      </NextPageLayoutBox>
    </>
  );
};

export default NextPageLayout;
