import React from 'react'
import dotenv from 'dotenv'
import LatestItems from "../../components/LatestItems";


function BlogPage({data}: {data:any}) {
  console.log('data :>> ', data);
  return (
    <>
      <h2>Tech Blog</h2>
      <p>I blog about various topics relevant to web development and other software topics in general.</p>
      <LatestItems title="My posts" list={data} path="blog" />
    </>
  )
}

export default BlogPage

export async function getStaticProps(){
  dotenv.config();

  const postsUrl = `${process.env.API_URL}/posts?_sort=published_at:DESC`;
  const postsResponse = await fetch(postsUrl);

  return {
    props: {
      data: await postsResponse.json(),
      revalidate: 20
    }
  }
}