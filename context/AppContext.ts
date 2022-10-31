import React, { useContext } from "react";

export const AppContext = React.createContext({
    title: "Mike Hansford",
    subtitle: `Web development`,
    description: `Mike Hansford's software development blog.`,
    author: `Mike Hansford`,
    linkedIn: `linkedin.com/in/mikehansford`,
    twitter: `twitter.com/mikehansford10`,
    github: `github.com/mikehans`
  });