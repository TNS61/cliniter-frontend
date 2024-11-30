import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
  <Head>
    <title>Cliniter</title>
    <meta name="viewport" content="initial-scale=1, width=device-width" />

  </Head>
  
  
  <Component {...pageProps} />
  
  </>;
}
