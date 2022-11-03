import React, { useEffect, useState } from "react";
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import dateFormatter from "../../components/utils/dateFormatter";
import dotenv from "dotenv";
import parse from "html-react-parser";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { BlogFrontmatter } from "../../types/BlogInterfaces";

export interface BlogPostProps {
  frontmatter: BlogFrontmatter;
  content: string;
}

function BlogPostPage(props: BlogPostProps) {
  const [bodyContent, setBodyContent] = useState("");
  // console.log("post :>> ", props);

  useEffect(() => {
    setBodyContent(markdownToHtml(props.content));
  }, [props.content]);

  return (
    <article>
      <h2>{props.frontmatter && props.frontmatter?.title}</h2>
      <div>
        Published:{" "}
        {props.frontmatter?.date &&
          dateFormatter(props.frontmatter?.date, "long")}
      </div>
      <div className="md-article">{parse(bodyContent)}</div>
    </article>
  );
}

export default BlogPostPage;

export async function getStaticPaths() {
  dotenv.config();

  const posts = fs.readdirSync("./data/posts");
  const paths = posts.map((post) => {
    const { data } = matter(fs.readFileSync(path.join("./data/posts", post)));
    console.log("data", data);
    return { params: { slug: data.slug } };
  });

  console.log("getStaticPaths paths", paths);

  return {
    paths,
    fallback: false
  };
}

// I can't detach the markdown filename from the slug param
export interface BlogPostGetStaticPropsProps {
  params: {
    slug: string;
  };
}
export async function getStaticProps(props: BlogPostGetStaticPropsProps) {
  // console.log('slug :>> ', props.params.slug);

  const markdownWithMetadata = fs.readFileSync(
    path.join("./data/posts", props.params.slug + ".md"),
    "utf-8"
  );
  // console.log('markdownWithMetadata :>> ', markdownWithMetadata);

  const { data: frontmatter, content } = matter(markdownWithMetadata);

  return {
    props: { frontmatter, content }
  };
}
