import React, { useEffect, useState } from "react";
import { markdownToHtml } from "./utils/markdownToHtml";
import parse from 'html-react-parser'

function AboutMe(props:any) {
  const [bodyContent, setBodyContent] = useState("");

  useEffect(() => {
    markdownToHtml(props.content).then((response) => {
      setBodyContent(response.value);
    });
  }, [props.content, setBodyContent]);

  return (
    <section>
      <h2>{props.title}</h2>
      <p>{parse(bodyContent)}</p>
    </section>
  );
}

export default AboutMe;
