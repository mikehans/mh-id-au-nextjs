import React from "react";
import { markdownToHtml } from "../components/utils/markdownToHtml";
import dateFormatter from "../components/utils/dateFormatter";
import parse from "html-react-parser";
import styles from "./SiteDevLogList.module.css"

function SiteDevLogList(props: any) {
  const formatDate = (theDate: string) => {
    return dateFormatter(theDate, "short");
  };

  return (
    <ul className={styles.cardList}>
      {props.data.map((log: any, index: number) => {
        return (
          <li key={index} className={styles.card}>
            <h3>{log.data.title}</h3>
            <p>{formatDate(log.data.date)}</p>
            {parse(markdownToHtml(log.content))}
          </li>
        );
      })}
    </ul>
  );
}

export default SiteDevLogList;
