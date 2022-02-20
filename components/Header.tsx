import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import Menu from "./Menu";

export interface HeaderProps {
  title: string;
  subtitle: string;
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header id="header" className={styles.mainHeader}>
      <div className={styles.container}>
        <div>
          <h1>
            <Link href="/">{title}</Link>
          </h1>
        </div>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
