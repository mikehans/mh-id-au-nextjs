import React from "react";
import dotenv from "dotenv";

function ProjectPage({ project }: { project: any }) {
  return (
    <article>
      <h2>{project.title}</h2>
      <p>{project.description}</p>
    </article>
  );
}

export default ProjectPage;

export async function getStaticPaths() {
  dotenv.config();

  const url = `${process.env.API_URL}/projects`;
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

  const url = `${process.env.API_URL}/projects/${sluggie}`;
  const res = await fetch(url);
  const project = await res.json();

  return {
    props: { project },
  };
}
