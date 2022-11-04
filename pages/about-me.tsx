import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import { markdownToHtml } from "../components/utils/markdownToHtml";
import parse from "html-react-parser";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

function AboutMePage({ data }: { data: any }) {
  const [pageContent, setPageContent] = useState("");

  // console.log('data :>> ', data);

  useEffect(() => {
    setPageContent(markdownToHtml(data));
  }, [data]);

  return <article>{parse(pageContent)}</article>;
}

export default AboutMePage;

export async function getStaticProps() {
  dotenv.config();
  const pagePath = path.join(
    process.env.DATA_PATH as string,
    process.env.ABOUT_ME_PAGE as string
  );

  const { content } = matter(fs.readFileSync(pagePath));

  return {
    props: {
      data: content
    }
  };
}
