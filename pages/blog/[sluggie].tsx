import React from 'react'
import dotenv from 'dotenv'
import authenticatedGetter from '../../components/utils/authenticatedGetter';

function BlogPostPage({post}: {post:any}) {
  // console.log('post :>> ', post);
  return (
    <h2>{post.title}</h2>
  )
}

export default BlogPostPage

export async function getStaticPaths() {
  dotenv.config();

  const url = `${process.env.API_URL}/posts`;
  const posts = await authenticatedGetter(url);

  console.log('posts :>> ', posts);
  const paths = posts.map((p:any) => ({
    params: {sluggie: p.sluggie}
  }));

  return {
    paths: [],
    fallback: false
  }
}

export async function getStaticProps({params}: {params: any}){
  dotenv.config();

  const sluggie: string = params.sluggie;

  const url = `${process.env.API_URL}/posts/${sluggie}`;
  const post = await authenticatedGetter(url);

  return {
    props: {post}
  }
}