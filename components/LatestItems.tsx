import React from "react";
import LatestItemsList from "./LatestItemsList";

function LatestItems({title, list, path}) {
  return (
    <section>
      <h2>{title}</h2>
      <LatestItemsList list={list} path={path} />
    </section>
  );
}

export default LatestItems;