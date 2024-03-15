import Sidebar from "@/organisms/Sidebar";
import { useRouter } from "next/router";
import ProjectDetailLayout from "@/templates/ProjectDetailLayout";
import Head from "next/head";

export default function Home() {
  const router = useRouter();

  console.log(router);

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogofavion.png" />
        <title>TodoIt</title>
      </Head>

      <ProjectDetailLayout />
    </>
  );
}
