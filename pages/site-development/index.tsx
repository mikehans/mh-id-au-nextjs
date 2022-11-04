import React from "react";
import dotenv from "dotenv";
import dateFormatter from "../../components/utils/dateFormatter";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SiteDevLogList from "../../components/SiteDevLogList";
import { sortByDateDesc } from "../../components/utils/sortAlgos";

function SiteDevelopmentPage(props: any) {
  // console.log("props :>> ", props);
  const formatDate = (theDate: string) => {
    return dateFormatter(theDate, "short");
  };

  return (
    <>
      <h2>Site Development Logs</h2>

      <SiteDevLogList data={props.fileData} />
    </>
  );
}

export default SiteDevelopmentPage;

type logEntry = {
  data: any,
  content: string,
  date: string
}

function descSort(entry1: logEntry, entry2: logEntry): number {
  if (new Date(entry1.date) < new Date(entry2.date)) {
    return 1;
  }
  if (new Date(entry1.date) > new Date(entry2.date)) {
    return -1;
  }
  return 0;
}

export async function getStaticProps() {
  dotenv.config();

  const files = fs.readdirSync("./data/site-dev-log");

  const fileData = files.map((file) => {
    const f = fs.readFileSync(path.join("./data/site-dev-log", file));
    const { data, content } = matter(f);
    return { data, content, date: data.date };
  });

  console.log('fileData', fileData)

  return {
    props: {
      fileData: fileData.sort(descSort)
    }
  };
}
