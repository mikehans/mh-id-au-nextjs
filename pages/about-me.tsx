import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import { markdownToHtml } from "../components/utils/markdownToHtml";
import parse from 'html-react-parser';
import fs from 'fs';
import matter from 'gray-matter';

function AboutMePage({ data }: {data: any}) {
  const [pageContent, setPageContent] = useState('');

  // console.log('data :>> ', data);

  useEffect(() => {
    setPageContent(markdownToHtml(data));
  }, [data]);

  return (
    <article>
      {parse(pageContent)}
    </article>
  );
}

export default AboutMePage;

export async function getStaticProps() {
  dotenv.config();

  const {content} = matter(fs.readFileSync('./data/about-me-page.md'));

  return {
    props: {
      data: content
    }
  };
}
