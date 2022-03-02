import React from 'react'
import { getStaticProps } from '../about-me'

function BlogPostPage() {
  return (
    <div> BlogPage</div>
  )
}

export default BlogPostPage

export function getStaticProps(context){
  console.log('context :>> ', context);
}

export async function getStaticPaths(){
  
}