import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useRecoilValue, useSetRecoilState } from "recoil";
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
  const { data: session, status } = useSession();
  const setToken = useSetRecoilState(jwtToken);

  useEffect(() => {
    if (status == "authenticated") {
      setToken(session?.user.accessToken);
    }
  }, [session]);

  console.log(session?.user.accessToken);

  const { data, error, isLoading } = useSWR(
    status == "authenticated" ? "https://laoh.site/api/todos/today" : null,
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
