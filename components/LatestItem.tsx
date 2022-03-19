import React from "react";
import Link from "next/link";
import dateFormatter from "./utils/dateFormatter";
import styles from "./LatestItem.module.css";
import Image from "next/image";

function LatestItem({
  published_at,
  title,
  description,
  sluggie,
  path,
  image,
}) {
  const buildUrl = (p: string, s: string) => {
    return `/${path}/${s}`;
  };

  return (
    <li className={styles.card}>
      <h3 className={styles.heading}>{title}</h3>
      <p className={styles.date}>{dateFormatter(published_at, "short")}</p>
      <p className={styles.description}>{description}</p>
      <Link href={buildUrl(path, sluggie)}>
        <a className={styles.link}>Read more</a>
      </Link>
      {/* {image && image.length > 0 ? <p><Image src={image[0].url} width={200} height={100} alt={image[0].alternativeText} className={styles.image} /></p>: ""} */}
    </li>
  );
}

export default LatestItem;
