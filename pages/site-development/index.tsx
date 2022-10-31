import React from "react";
import dotenv from "dotenv";
import dateFormatter from "../../components/utils/dateFormatter";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { markdownToHtml } from "../../components/utils/markdownToHtml";
import parse from "html-react-parser";

function SiteDevelopmentPage(props) {
  console.log("props :>> ", props);
  const formatDate = (theDate: string) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    return new Date(theDate).toLocaleDateString(undefined, options);
  };

  return (
    <>
      <h2>Site Development Logs</h2>

      {props.fileData.map((log: any, index: number) => {
        return (
          <article key={index}>
            <h3>{log.data.title}</h3>
            <p>{formatDate(log.data.date)}</p>
            <p>{parse(markdownToHtml(log.content))}</p>
          </article>
        );
      })}
    </>
  );
}

export default SiteDevelopmentPage;

export async function getStaticProps() {
  dotenv.config();

  const files = fs.readdirSync("./data/site-dev-log");

  const fileData = files.map((file) => {
    const f = fs.readFileSync(path.join("./data/site-dev-log", file));
    const { data, content } = matter(f);
    return { data, content };
  });

  return {
    props: {
      fileData
    }
  };
}
