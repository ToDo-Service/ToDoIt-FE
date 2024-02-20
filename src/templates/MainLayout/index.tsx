import styled from "styled-components";
import { useSession } from "next-auth/react";
import { useSetRecoilState } from "recoil";
import { jwtToken } from "@/reocoil";
import Sidebar from "@/organisms/Sidebar";
import PageTemp from "@/organisms/PageTemp";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const MainLayout = styled.div`
  display: flex;
`;
interface user {
  name: string | null | undefined;
  img: string | null | undefined;
}

const MainLayouts = () => {
  const { data: session } = useSession();
  const setToken = useSetRecoilState(jwtToken);
  setToken(session?.user.accessToken);

  const { data, error, isLoading } = useSWR(
    session != undefined ? "https://laoh.site/api/todos/today" : null,
    (url) => fetcher(url, session?.user.accessToken as string)
  );
  console.log(data);

  // if (isLoading) return <div>로딩중</div>;
  // if (error) return <div>로딩중</div>;

  return (
    <MainLayout>
      <Sidebar />
      <PageTemp data={data} />
    </MainLayout>
  );
};

export default MainLayouts;
