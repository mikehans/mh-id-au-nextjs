import React from 'react'
import dotenv from 'dotenv'
import LatestItems from "../../components/LatestItems";

function ProjectsPage({data}: {data: any}) {
  return (
    <>
    <div>Projects</div>
    <LatestItems title="Latest Projects" list={data} path="projects" />
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