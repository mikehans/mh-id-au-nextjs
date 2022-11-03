import React from "react";
import dotenv from "dotenv";
import LatestItems from "../../components/LatestItems";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { BlogFrontmatter } from "./BlogInterfaces";

export interface BlogPageProps {
  data: BlogFrontmatter;
}

function BlogPage({ data }: { data: BlogFrontmatter }) {
  // console.log("data :>> ", data);
  return (
    <>
      <h2>Tech Blog</h2>
      <p>
        I blog about various topics relevant to web development and other
        software topics in general.
      </p>
      <LatestItems title="My posts" list={data} path="blog" />
    </>
  );
}

export default BlogPage;

export async function getStaticProps() {
  dotenv.config();

  const files = fs.readdirSync("./data/posts");

  // console.log("files", files);

  const fileInfo = files.map((file) => {
    const f = fs.readFileSync(path.join("./data/posts", file));
    const { data, content } = matter(f);
    return { data, content };
  });

  return {
    props: {
      data: fileInfo
    }
  };
}
