import ToDoItLayout from "@/templates/ToDoItLayout";
import ProjectPageLayout from "@/templates/ProjectPageLayout";
import NextPlanPageLayout from "@/templates/NextPlanPageLayout";
import { useRouter } from "next/router";
import Layout from "./layout";
import { useSession } from "next-auth/react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { jwtToken, SidebarLayout } from "@/reocoil";
import useSWR, { SWRConfig } from "swr";
import fetcher from "@/utils/fetcher";
import Head from "next/head";
import { Suspense } from "react";
import { LoadingSpinner } from "@/atoms/LoadingSpinner";

export default function Home() {
  const router = useRouter();

  const { data: session, status } = useSession();
  const setToken = useSetRecoilState(jwtToken);
  const SToogleState = useRecoilValue(SidebarLayout);

  if (status === "authenticated") {
    setToken(session?.user.accessToken);
  }

  const { data } = useSWR(
    status === "authenticated" ? "https://laoh.site/api/todos/today" : null,
    (url) => fetcher(url, session?.user.accessToken as string)
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogo.png" />
        <title>TodoIt</title>
      </Head>
      <SWRConfig value={{ suspense: true }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Layout>
            {router.asPath === "/main/today" && <ToDoItLayout Data={data} />}
            {router.asPath === "/main/project" && <ProjectPageLayout />}
            {router.asPath === "/main/nextplan" && <NextPlanPageLayout />}
          </Layout>
        </Suspense>
      </SWRConfig>
    </>
  );
}
