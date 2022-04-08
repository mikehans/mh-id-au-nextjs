import React from 'react'
import dotenv from 'dotenv'
import LatestItems from "../../components/LatestItems";

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

export async function getStaticProps(){
  dotenv.config();

  const url = `${process.env.API_URL}/projects?_sort=published_at:DESC`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      data,
      revalidate: 20
    }
  }
}