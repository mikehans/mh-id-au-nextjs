import type { NextPage } from "next";
import Head from "next/head";
import AboutMe from "../components/AboutMe"
import LatestItems from "../components/LatestItems";
import authenticatedGetter from '../components/utils/authenticatedGetter';
import dotenv from "dotenv"

const Home: NextPage = (props: any) => {
  const homePageContent = props.homePage;
  const postsList = props.posts;
  const projectsList = props.projects;

  return <>
    <AboutMe title={homePageContent.pageContent.title} content={homePageContent.pageContent.content} />

    <LatestItems title="My Latest Posts" list={postsList} path="blog" />

    <LatestItems title="My Projects" list={projectsList} path="projects"/>
  </>;
};

export default Home;

export async function getStaticProps(){
  // console.log("getStaticProps")
  dotenv.config();

  // FIXME: Note that these are still 3 resources
  const postsUrl = `${process.env.API_URL}/posts?_sort=published_at:DESC&_limit=3`;
  // console.log('postsUrl :>> ',postsUrl);
  const projectsUrl = `${process.env.API_URL}/projects?_sort=published_at:DESC&_limit=2`;
  const homePageUrl = `${process.env.API_URL}/home-page`;
  
  const postsData = await authenticatedGetter(postsUrl);
  const projectsData = await authenticatedGetter(projectsUrl);
  const homePageData = await authenticatedGetter(homePageUrl);

  // console.log('postsResponse :>> ', postsResponse);

  return {
    props: {
      homePage: homePageData,
      posts: postsData,
      projects: projectsData
    },
    revalidate: 20
  }
}
