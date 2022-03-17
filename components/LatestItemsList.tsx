import React from 'react'
import LatestItem from "./LatestItem"
import styles from "./LatestItemsList.module.css"

function LatestItemsList({list, path}) {
  console.log('list :>> ', list);
  return (
    <section>
        <ul className={styles.cardList}>
        {
            list.map((item, idx) => (
                <li key={idx} className={styles.cardListItem}><LatestItem {...item} path={path} /></li>
            ))
        }
        </ul>

    </section>
  )
}

export default LatestItemsList