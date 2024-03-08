import { AppProps } from "next/app";
import Head from "next/head";

export default function App({
  Component,
  pageProps: { ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="Icon/Todoit/TodoitLogofavion.png" />
        <title>TodoIt</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
