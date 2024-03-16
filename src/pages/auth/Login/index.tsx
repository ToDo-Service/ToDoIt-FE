import LoginC from "@/organisms/Login";
import Head from "next/head";

export default function Login() {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogofavion.png" />
        <title>TodoIt</title>
      </Head>
      <LoginC />
    </>
  );
}
