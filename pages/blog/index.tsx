import React from 'react'
import dotenv from 'dotenv'
import LatestItems from "../../components/LatestItems";


function BlogPage({data}) {
  console.log('data :>> ', data);
  return (
    <>
      <h1>Hello</h1>
      <LatestItems title="My posts" list={data} path="blog" />
    </>
  )
}

export default BlogPage

export async function getStaticProps(context){
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