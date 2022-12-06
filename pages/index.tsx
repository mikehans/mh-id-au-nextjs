import type { NextPage } from "next";
import Head from "next/head";
import AboutMe from "../components/AboutMe";
import LatestItems from "../components/LatestItems";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import process from 'process';
import matter from "gray-matter";
import { sortByDateDesc } from "../components/utils/sortAlgos";
import take from "lodash.take";

interface HomePageProps {
  content: any;
  frontmatter: any
}

const Home: NextPage = (props: any) => {
  const homePageContent = props.homePage;
  const postsList = props.latestPosts;
  const projectsList = props.latestProjects;

  // console.log("props", props);
  return (
    <>
      <AboutMe
        title={homePageContent.frontmatter.title}
        content={homePageContent.content}
      />

      <LatestItems title="My Latest Posts" list={postsList} path="blog" />

      <LatestItems title="My Projects" list={projectsList} path="projects" />
    </>
  );
};

export default Home;

interface GetStaticPropsReturnType {
  props:{
    homePage: any;
    latestPosts: any;
    latestProjects: any;
  }
}

export async function getStaticProps () : Promise<GetStaticPropsReturnType> {
  dotenv.config();
  const homepagePath = path.join(process.env.DATA_PATH as string, process.env.HOME_PAGE as string);

  const { data: homePageFrontmatter, content: homePageContent } = matter(
    fs.readFileSync(homepagePath, "utf-8")
  );

  const postsPath = path.join(process.env.DATA_PATH as string, process.env.POSTS_PATH as string);
  const posts = fs.readdirSync(postsPath);

  const postFiles = posts.map((post) => {
    const { data } = matter(fs.readFileSync(path.join(postsPath, post)));
    return { filename: post, date: data.date, data };
  });

  const projectsPath = path.join(process.env.DATA_PATH as string, process.env.PROJECTS_PATH as string)
  const projects = fs.readdirSync(projectsPath);

  const projectFiles = projects.map((project) => {
    const { data } = matter(
      fs.readFileSync(path.join(projectsPath, project))
    );
    return { filename: project, date: data.date, data };
  });

  return {
    props: {
      homePage: {
        content: homePageContent,
        frontmatter: homePageFrontmatter
      },
      latestPosts: take(postFiles.sort(sortByDateDesc), 3),
      latestProjects: take(projectFiles.sort(sortByDateDesc), 3)
    }
  };
}
