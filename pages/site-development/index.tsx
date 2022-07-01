import React from "react";
import dotenv from "dotenv";
import dateFormatter from "../../components/utils/dateFormatter";

function SiteDevelopmentPage({ logs }: {logs: any}) {
  return (
    <>
      <h2>Site Development Logs</h2>

      {logs.map((log: any) => {
        return (
          <article key={log.id}>
            <h3>{log.title}</h3>
            <p>{log.published_at}</p>
            <p>{log.content}</p>
          </article>
        )
      })}
      
    </>
  );
}

export default SiteDevelopmentPage;

export async function getStaticProps() {
  dotenv.config();

  const url = `${process.env.API_URL}/dev-logs`;
  const res = await fetch(url);
  const logs = await res.json();

  return {
    props: {
      logs,
    },
    revalidate: 60
  };
}
