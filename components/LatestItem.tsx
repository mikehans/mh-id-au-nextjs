import React from 'react'
import Link from 'next/link';
import dateFormatter from "./utils/dateFormatter";

function LatestItem({published_at, title, description, sluggie, path}) {
  const buildUrl = (p: string, s:string) => {
    return `/${path}/${s}`;
  }

  return (
    <article>
        <h3>{title}</h3>
        <p>{dateFormatter(published_at, "short")}</p>
        <p>{description}</p>
        <Link href={buildUrl(path, sluggie)}><a>Read more</a></Link>
    </article>
  )
}

export default LatestItem