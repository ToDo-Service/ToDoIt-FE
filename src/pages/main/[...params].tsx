import ToDoItLayout from "@/templates/ToDoItLayout";
import ProjectPageLayout from "@/templates/ProjectPageLayout";
import NextPlanMainPage from "@/organisms/NextPlan/NextPlanMainPage";
import { useRouter } from "next/router";
import Layout from "./layout";

import Head from "next/head";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogofavion.png" />
        <title>TodoIt</title>
      </Head>
      <Layout>
        {router.asPath === "/main/today" ? <ToDoItLayout /> : undefined}
        {router.asPath === "/main/project" ? <ProjectPageLayout /> : undefined}
        {router.asPath === "/main/nextplan" ? <NextPlanMainPage /> : undefined}
      </Layout>
    </>
  );
}
