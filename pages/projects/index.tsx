import React from 'react'
import dotenv from 'dotenv'
import LatestItems from "../../components/LatestItems";
import fs from 'fs';
import path from 'path';
import process from 'process';
import matter from "gray-matter";
import { ProjectFrontmatter } from "../../types/ProjectInterfaces";

function ProjectsPage({data}: {data: any}) {
  return (
    <>
    <h2>Tech Projects</h2>
    <p>Check out my tech projects here. Each project contains a description of the project, 
      a discussion of any interesting things that occurred and any lessons drawn from them.</p>
    <LatestItems title="Current Projects" list={data} path="projects" />
    </>
  )
}

export default ProjectsPage

export async function getStaticProps() {
  dotenv.config();
  const projPath = path.join(process.env.DATA_PATH as string, process.env.PROJECTS_PATH as string);

  // console.log('projPath :>> ', projPath);
  const files = fs.readdirSync(projPath);
  // console.log("files", files);

  const fileInfo = files.map((file) => {
    const f = fs.readFileSync(path.join(projPath, file));
    const { data, content } = matter(f);
    return { data, content };
  });

  return {
    props: {
      data: fileInfo
    }
  };
}