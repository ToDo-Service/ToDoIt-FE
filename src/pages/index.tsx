import MainPageLayout from "@/templates/MainPageLayout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogofavion.png" />
        <title>TodoIt</title>
      </Head>
      <main>
        <MainPageLayout />
      </main>
    </>
  );
}
