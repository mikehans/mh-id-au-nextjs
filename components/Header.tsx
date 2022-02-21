import React from "react";
import Link from "next/link";
// import styles from "./Header.module.css";
import Menu from "./Menu";

export interface HeaderProps {
  title: string;
  subtitle: string;
}

function Header({ title, subtitle }: HeaderProps) {
  return (
    <header id="header" className="py-5 fixed top-0 left-0 z-20 bg-amber-500 px-3 w-full">
      <div className="flex justify-between items-center">
          <h1>
            <Link href="/">{title}</Link>
          </h1>
        <Menu />
      </div>
    </header>
  );
}

export default Header;
