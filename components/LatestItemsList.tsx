import React from 'react'
import LatestItem from "./LatestItem"

function LatestItemsList({list, path}) {
  return (
    <section>
        <ul>
        {
            list.map((item, idx) => (
                <li key={idx}><LatestItem {...item} path={path} /></li>
            ))
        }
        </ul>

    </section>
  )
}

export default LatestItemsList