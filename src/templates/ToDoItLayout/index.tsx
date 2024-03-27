import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { jwtToken } from "@/reocoil";
import MainPage from "@/organisms/TodoIt/TodoItMainPage";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useRecoilValue } from "recoil";
import { SidebarLayout } from "@/reocoil";

const MainLayout = styled.div<{ open: boolean | null }>`
  width: 100vw;
  height: 100vh;
  position: fixed;
  animation: 0.7s
    ${(prop) =>
      prop.open !== null && prop.open ? "PopUpHeader" : "PopOutHeader"}
    forwards;
  z-index: 2;
  @keyframes PopUpHeader {
    0% {
      transform: translate(-10%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }

  @keyframes PopOutHeader {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-10%, 0);
    }
  }
`;

const MainLayouts = () => {
  const { data: session, status } = useSession();
  const setToken = useSetRecoilState(jwtToken);
  const SToogleState = useRecoilValue(SidebarLayout);

  if (status === "authenticated") {
    setToken(session?.user.accessToken);
  }

  const { data, error, isLoading } = useSWR(
    status === "authenticated" ? "https://laoh.site/api/todos/today" : null,
    (url) => fetcher(url, session?.user.accessToken as string)
  );

  return (
    <MainLayout open={SToogleState}>{<MainPage data={data} />}</MainLayout>
  );
};

export default MainLayouts;
