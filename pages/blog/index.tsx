import React from 'react'
import dotenv from 'dotenv'
import authenticatedGetter from '../../components/utils/authenticatedGetter';
import LatestItems from "../../components/LatestItems";


function BlogPage({data}: {data:any}) {
  // console.log('data :>> ', data);
  return (
    <>
      <h1>Hello</h1>
      <LatestItems title="My posts" list={data} path="blog" />
    </>
  )
}

export default BlogPage

export async function getStaticProps(){
  dotenv.config();

  const postsUrl = `${process.env.API_URL}/posts?_sort=published_at:DESC`;
  const postsData = await authenticatedGetter(postsUrl);
  // const postsResponse = await fetch(postsUrl, {
  //   method: 'GET',
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": `Bearer ${result.data.jwt}`
  //   }
  // });

  return {
    props: {
      data: postsData,
      revalidate: 20
    }
  }
}