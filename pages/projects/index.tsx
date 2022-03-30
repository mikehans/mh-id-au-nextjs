import React from 'react'
import dotenv from 'dotenv'
import LatestItems from "../../components/LatestItems";
import authenticatedGetter from '../../components/utils/authenticatedGetter';


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
  const data = await authenticatedGetter(url);
  console.log('projects data :>> ', data);

  return {
    props: {
      data,
      revalidate: 20
    }
  }
}