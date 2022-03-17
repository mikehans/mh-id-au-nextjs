import React from 'react'
import dotenv from 'dotenv'


function ProjectPage() {
  return (
    <div> ProjectPage</div>
  )
}

export default ProjectPage

export async function getStaticPaths() {
  dotenv.config();

  const url = `${process.env.API_URL}/projects`;
  const res = await fetch(url);
  const posts = await res.json();
  
  const paths = posts.map(p => ({
    params: {sluggie: p.sluggie}
  }));

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params: {sluggie}}){
  dotenv.config();

  const url = `${process.env.API_URL}/projects/${sluggie}`;
  const res = await fetch(url);
  const post = await res.json()

  return {
    props: {post}
  }
}