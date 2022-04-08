import React, { useEffect, useState } from "react";
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import dateFormatter  from "../../components/utils/dateFormatter";
import dotenv from "dotenv";
import parse from 'html-react-parser';

function BlogPostPage({ post }: { post: any }) {
  const [bodyContent, setBodyContent] = useState("");

  console.log("post :>> ", post);

  useEffect(() => {
    markdownToHtml(post.content).then((response) => {
      setBodyContent(response.value);
    });
  }, [post.content, setBodyContent]);

  return (
    <article>
      <h2>{post.title}</h2>
      <div>Published: {dateFormatter(post.published_at, "long")}</div>
      <div>{parse(bodyContent)}</div>
    </article>
  );
}

export default BlogPostPage;

export async function getStaticPaths() {
  dotenv.config();

  const url = `${process.env.API_URL}/posts`;
  const res = await fetch(url);
  const posts = await res.json();

  const paths = posts.map((p: any) => ({
    params: { sluggie: p.sluggie },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: any }) {
  dotenv.config();

  const sluggie: string = params.sluggie;

  const url = `${process.env.API_URL}/posts/${sluggie}`;
  const res = await fetch(url);
  const post = await res.json();

  return {
    props: { post },
  };
}
