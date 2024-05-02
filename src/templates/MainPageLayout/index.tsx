import MainPageHeader from "@/organisms/MainPage/MainPageHeader";
import MainPageFooter from "@/organisms/MainPage/MainPageFooter";
import MainPageBody from "@/organisms/MainPage/MainPageBody";
import { useEffect } from "react";

const MainPageLayout = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* <MainPageHeader /> */}
      <MainPageBody />
      {/* <MainPageFooter /> */}
    </>
  );
};

export default MainPageLayout;
