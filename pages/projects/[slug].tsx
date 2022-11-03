import React, { useEffect, useState } from "react";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import parse from "html-react-parser";
import { ProjectFrontmatter, ProjectProps } from "./ProjectInterfaces";

function ProjectPage(props: ProjectProps) {
  const [content, setContent] = useState("");

  // console.log("props :>> ", props);

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

interface GetStaticPropsParams{
  params: {
    slug: string;
  };
}
interface GetStaticPropsReturnType {
  props: ProjectProps;
}

// I can't detach the markdown filename from the slug param
export async function getStaticProps(props: GetStaticPropsParams) {
  // console.log("slug :>> ", slug);

  const markdownWithMetadata = fs.readFileSync(
    path.join("./data/projects", props.params.slug + ".md"),
    "utf-8"
  );
  // console.log("markdownWithMetadata :>> ", markdownWithMetadata);

  // TODO: The types here and the return type don't align
  const { data: frontmatter, content } = matter(markdownWithMetadata);

  return {
    props: { frontmatter, content }
  };
}
