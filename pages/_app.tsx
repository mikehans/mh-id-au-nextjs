import React, { useContext } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import {AppContext} from '../context/AppContext';

function MyApp({ Component, pageProps }: AppProps) {
  const contextData = useContext(AppContext);

  console.log('pageProps', pageProps)

  return (
    <>
      <Layout title={contextData.title} subtitle={contextData.subtitle}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
