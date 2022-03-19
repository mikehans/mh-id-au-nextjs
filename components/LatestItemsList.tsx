import React from 'react'
import LatestItem from "./LatestItem"
import styles from "./LatestItemsList.module.css"

function LatestItemsList({list, path}: {list: any, path: string}) {
  console.log('list :>> ', list);
  return (
    <section>
        <ul className={styles.cardList}>
        {
            list.map((item: any, idx: any) => (
                <LatestItem key={idx} {...item} path={path} />
            ))
        }
        </ul>

    </section>
  )
}

export default LatestItemsList