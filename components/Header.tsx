import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Menu from "./Menu";

function Header({title}) {
  return (
    <header id="header" className={styles.mainHeader}>
      <div className={styles.container}>
        <h1>
          <Link href="/">{title}</Link>
        </h1>
        <Menu />
      </div>
    </header>
  );
}

export default Header;

