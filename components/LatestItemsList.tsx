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
                <LatestItem key={idx} title={item.data.title} slug={item.data.slug} date={item.data.date} path={path} />
            ))
        }
        </ul>

    </section>
  )
}

export default LatestItemsList