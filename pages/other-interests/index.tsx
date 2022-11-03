import React, { useEffect, useState } from 'react';
import matter from 'gray-matter';
import fs from 'fs';
import dotenv from 'dotenv';
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

  const {content} = matter(fs.readFileSync('./data/other-interests-page.md'));

  return {
    props: {
      markdownString: content
    }
  };
}