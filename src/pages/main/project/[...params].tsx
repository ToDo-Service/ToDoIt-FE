import ProjectDetailLayout from "@/templates/ProjectDetailLayout";
import Layout from "../layout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogo.png" />
        <title>TodoIt</title>
      </Head>
      <Layout>
        <ProjectDetailLayout />
      </Layout>
    </>
  );
}
