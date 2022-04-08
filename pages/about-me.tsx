import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import { markdownToHtml } from "../components/utils/markdownToHtml";
import parse from 'html-react-parser'

function AboutMePage({ data }: {data: any}) {
  const [pageContent, setPageContent] = useState('');

  console.log('data :>> ', data);

  useEffect(() => {
    markdownToHtml(data.pageContent.content).then(response => setPageContent(response.value));
  }, [data.pageContent.content]);

  return (
    <>
      {parse(pageContent)}
    </>
  );
}

export default AboutMePage;

export async function getStaticProps() {
  dotenv.config();

  const aboutPageUrl = `${process.env.API_URL}/about-me`;

  const response = await fetch(aboutPageUrl);

  console.log("response :>> ", response);

  return {
    props: {
      data: await response.json(),
    },
    revalidate: 20
  };
}
