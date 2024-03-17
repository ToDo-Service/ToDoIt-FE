import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { jwtToken } from "@/reocoil";
import MainPage from "@/organisms/TodoIt/TodoItMainPage";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const MainLayout = styled.div`
  width: 100vw;
  overflow: hidden;

  display: flex;
`;

const MainLayouts = () => {
  const { data: session, status } = useSession();
  const setToken = useSetRecoilState(jwtToken);

  if (status === "authenticated") {
    setToken(session?.user.accessToken);
  }

  const { data, error, isLoading } = useSWR(
    status === "authenticated" ? "https://laoh.site/api/todos/today" : null,
    (url) => fetcher(url, session?.user.accessToken as string)
  );

  return (
    <MainLayout>
      <MainPage data={data} />
    </MainLayout>
  );
};

export default MainLayouts;
