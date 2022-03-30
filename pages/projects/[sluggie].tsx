import React from 'react'
import dotenv from 'dotenv'
import authenticatedGetter from '../../components/utils/authenticatedGetter';


function ProjectPage({project}: {project: any}) {
  return (
    <>
    <h2>{project.title}</h2>
    <p>{project.description}</p>
    </>
  )
}

export default ProjectPage

export async function getStaticPaths() {
  dotenv.config();

  const url = `${process.env.API_URL}/projects`;
  const posts = await authenticatedGetter(url);

  // const res = await fetch(url);
  // const posts = await res.json();
  
  const paths = posts.map((p: any) => ({
    params: {sluggie: p.sluggie}
  }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}: {params: any}){
  dotenv.config();

  const sluggie: string = params.sluggie;

  const url = `${process.env.API_URL}/projects/${sluggie}`;
  const project = await authenticatedGetter(url);

  return {
    props: {project}
  }
}