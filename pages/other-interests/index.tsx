import React, { useEffect, useState } from 'react';
import matter from 'gray-matter';
import fs from 'fs';
import dotenv from 'dotenv';
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import parse from 'html-react-parser';

function OtherInterestsPage({data}) {
  const [pageContent, setPageContent] = useState('');

  useEffect(() => {
    setPageContent(markdownToHtml(data));
  }, [data]);

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
      data: content
    }
  };
}