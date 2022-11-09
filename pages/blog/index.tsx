import React from "react";
import dotenv from "dotenv";
import LatestItems from "../../components/LatestItems";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { BlogFrontmatter } from "../../types/BlogInterfaces";
// import { sortByDateDesc } from "../../components/utils/sortAlgos";

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

type Post = {
  data: any;
  content: string;
  date: string;
};

function descSort(entry1: Post, entry2: Post): number {
  if (new Date(entry1.date) < new Date(entry2.date)) {
    return 1;
  }
  if (new Date(entry1.date) > new Date(entry2.date)) {
    return -1;
  }
  return 0;
}

export async function getStaticProps() {
  dotenv.config();
  const postsPath = path.join(process.env.DATA_PATH as string, process.env.POSTS_PATH as string);

  const files = fs.readdirSync(postsPath);

  // console.log("files", files);

  const fileInfo = files.map((file) => {
    const f = fs.readFileSync(path.join(postsPath, file));
    const { data, content } = matter(f);
    return { data, content, date: data.date };
  });

  return {
    props: {
      data: fileInfo.sort(descSort)
    }
  };
}
