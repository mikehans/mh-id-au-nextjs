import React, { useEffect, useState } from 'react';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import process from 'process';
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import parse from 'html-react-parser';

function OtherInterestsPage({markdownString}: {markdownString: string}) {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    setPageContent(markdownToHtml(markdownString));
  }, [markdownString]);

  return (
    <article>
      {parse(pageContent)}
    </article>
  )
}

export default OtherInterestsPage

export async function getStaticProps() {
  dotenv.config();
  const interestsPath = path.join(process.env.DATA_PATH as string, process.env.POSTS_PATH as string);

  const {content} = matter(fs.readFileSync('./data/other-interests-page.md'));

  return {
    props: {
      markdownString: content
    }
  };
}