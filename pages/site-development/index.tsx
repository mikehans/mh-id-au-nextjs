import React from 'react'
import dotenv from "dotenv";
import authenticatedGetter from '../../components/utils/authenticatedGetter';

function SiteDevelopmentPage({data}) {

  // console.log(data);
  return (
    <>
    <div>Site Development</div>

    <section>
      {data.map(d => <article className='testMe' key={d.id}>
        <h3>{d.title}</h3>
        <div>{d.content}</div>
      </article>)}
    </section>
    </>
  )
}

export default SiteDevelopmentPage

export async function getStaticProps() {
  dotenv.config();

  const url = `${process.env.API_URL}/dev-logs?_sort=published_at:DESC&_limit=15`;
  const data = await authenticatedGetter(url);

  return {
    props: {
      data,
      revalidate: 10
    }
  }
}