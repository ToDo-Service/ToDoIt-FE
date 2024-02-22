import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { jwtToken } from "@/reocoil";
import Sidebar from "@/organisms/Sidebar";
import MainPage from "@/organisms/MainPage";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";
import { useEffect } from "react";

const MainLayout = styled.div`
  display: flex;
`;

const MainLayouts = () => {
  const { data: session } = useSession();
  const setToken = useSetRecoilState(jwtToken);
  useEffect(() => {
    if (session) {
      setToken(session?.user.accessToken);
    }
  }, [session]);

  const { data, error, isLoading } = useSWR(
    session != undefined ? "https://laoh.site/api/todos/today" : null,
    (url) => fetcher(url, session?.user.accessToken as string)
  );

  if (isLoading) return <div>로딩중</div>;
  // if (error) return <div>로딩중</div>;

  return (
    <MainLayout>
      <Sidebar />
      <MainPage data={data} />
    </MainLayout>
  );
};

export default MainLayouts;
