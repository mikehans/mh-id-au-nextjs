import React from 'react'
import Link from 'next/link'
import styles from './Menu.module.css';

export default function Menu() {
    return (
        <nav className={styles.navbar}>
            <ul className="flex flex-row flex-wrap list-none">
                <li className="pr-6"><Link href="/">Home</Link></li>
                <li className="pr-6"><Link href="/about-me">About Me</Link></li>
                <li className="pr-6"><Link href="/blog">Blog</Link></li>
                <li className="pr-6"><Link href="/site-development">Site Development</Link></li>
                <li className="pr-6"><Link href="/projects">Projects</Link></li>
            </ul>
        </nav>
    )
}