import MainPageLayout from "@/templates/MainPageLayout";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="google-site-verification"
          content="R1ER2VRpZqX-xxD-GJdX6bF3uao9hRRAwmx9qPX4isE"
        />
        <link rel="icon" href="Icon/Todoit/TodoitLogofavion.png" />
        <title>TodoIt</title>
      </Head>
      <main>
        <MainPageLayout />
      </main>
    </>
  );
}
