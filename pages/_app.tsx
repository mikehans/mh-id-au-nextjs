import React, { useContext } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import {AppContext} from '../context/AppContext';

function MyApp({ Component, pageProps }: AppProps) {
  const data = useContext(AppContext);

  return (
    <>
      <Layout title={data.title} subtitle={data.subtitle}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
