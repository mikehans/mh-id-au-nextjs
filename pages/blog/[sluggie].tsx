import React from 'react'
import { getStaticProps } from '../about-me'
import dotenv from 'dotenv'

function BlogPostPage({post}) {
  console.log('post :>> ', post);
  return (
    <h2>{post.title}</h2>
  )
}

export default BlogPostPage

export async function getStaticPaths() {
  dotenv.config();

  const url = `${process.env.API_URL}/posts`;
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

  const url = `${process.env.API_URL}/posts/${sluggie}`;
  const res = await fetch(url);
  const post = await res.json()

  return {
    props: {post}
  }
}