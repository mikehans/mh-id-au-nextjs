import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import parse from "html-react-parser";

function ProjectPage(props) {
  const [content, setContent] = useState("");

  console.log("props :>> ", props);

  useEffect(() => {
    setContent(markdownToHtml(props.content));
  }, [props.content]);

  return (
    <article>
      <h2>{props.frontmatter.title}</h2>
      <p>{props.frontmatter.description}</p>
      <p className="md-article">{parse(content)}</p>
    </article>
  );
}

export default ProjectPage;

export async function getStaticPaths() {
  dotenv.config();

  const projects = fs.readdirSync("./data/projects");
  const paths = projects.map((project) => {
    const { data } = matter(
      fs.readFileSync(path.join("./data/projects", project))
    );
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
export async function getStaticProps({ params: { slug } }) {
  console.log("slug :>> ", slug);

  const markdownWithMetadata = fs.readFileSync(
    path.join("./data/projects", slug + ".md"),
    "utf-8"
  );
  console.log("markdownWithMetadata :>> ", markdownWithMetadata);

  const { data: frontmatter, content } = matter(markdownWithMetadata);

  return {
    props: { frontmatter, content }
  };
}
