import React from 'react'
import Link from 'next/link'
import styles from './Menu.module.css';

export default function Menu() {
    return (
        <nav className={styles.navbar}>
            <ul className={styles.navbarNav}>
                <li className={styles.navItem}><Link href="/">Home</Link></li>
                <li className={styles.navItem}><Link href="/about-me">About Me</Link></li>
                <li className={styles.navItem}><Link href="/blog">Blog</Link></li>
                <li className={styles.navItem}><Link href="/site-development">Site Development</Link></li>
                <li className={styles.navItem}><Link href="/projects">Projects</Link></li>
            </ul>
        </nav>
    )
}