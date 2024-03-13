import ToDoItLayout from "@/templates/ToDoItLayout";
import ProjectPageLayout from "@/templates/ProjectPageLayout";
import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";

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
      <Sidebar />

      {router.asPath === "/main/today" ? <ToDoItLayout /> : undefined}
      {router.asPath === "/main/project" ? <ProjectPageLayout /> : undefined}
    </>
  );
}
