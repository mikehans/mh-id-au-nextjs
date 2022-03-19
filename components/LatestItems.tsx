import React from "react";
import LatestItemsList from "./LatestItemsList";

interface LatestItemsProps {
  title: string;
  list: any;
  path: string;
}

function LatestItems({title, list, path}: LatestItemsProps) {
  return (
    <section>
      <h2>{title}</h2>
      <LatestItemsList list={list} path={path} />
    </section>
  );
}

export default LatestItems;