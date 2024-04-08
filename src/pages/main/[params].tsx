import React from "react";
import { useRouter } from "next/router";
import Layout from "./layout";
import { useSession } from "next-auth/react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { jwtToken, SidebarLayout } from "@/reocoil";
import useSWR, { SWRConfig } from "swr";
import fetcher from "@/utils/fetcher";
import Head from "next/head";
import dynamic from "next/dynamic";

//스플리팅

const ToDoItLayout = dynamic(() => import("@/templates/ToDoItLayout"));
const ProjectPageLayout = dynamic(
  () => import("@/templates/ProjectPageLayout")
);
const NextPlanPageLayout = dynamic(
  () => import("@/templates/NextPlanPageLayout")
);

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const setToken = useSetRecoilState(jwtToken);

  if (status === "authenticated") {
    setToken(session?.user.accessToken);
  }

  const { data } = useSWR(
    status === "authenticated" && "https://laoh.site/api/todos/today",
    (url) => fetcher(url, session?.user.accessToken as string)
  );

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogo.png" />
        <title>TodoIt</title>
      </Head>

      <main>
        <Layout>
          {router.asPath === "/main/today" && <ToDoItLayout Data={data} />}
          {router.asPath === "/main/project" && <ProjectPageLayout />}
          {router.asPath === "/main/nextplan" && <NextPlanPageLayout />}
        </Layout>
      </main>
    </>
  );
}