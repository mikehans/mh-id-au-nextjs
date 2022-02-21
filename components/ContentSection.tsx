import React from 'react'
import Link from 'next/link';
import styles from './ContentSection.module.css';

export default function ContentSection(props) {
    let { styleNumber, altFacing = false, heading = 'Test me', intro = 'Lorem ipsum forceum blah blah blah', link = '#' } = props;

    let styleString = '';

    switch (styleNumber) {
        case '1':
            styleString = `${styles.contentSection} ${styles.contentSectionStyle1}`;
            break;
        case '2':
            styleString = `${styles.contentSection} ${styles.contentSectionStyle2}`;
            break;
        case '3':
            styleString = `${styles.contentSection} ${styles.contentSectionStyle3}`;
            break;
        default:
            styleString = `${styles.contentSection} ${styles.contentSectionStyle1} DEFAULT`;
    }

    styleString = altFacing ? `${styleString} ${styles.contentSectionAltFacing}` : styleString;


    return (
        <section className="my-0">
            <div className="py-4">
                <a href="#" className="image"><img src="images/pic01.jpg" alt="" /></a>
                <div className="">
                    <h3>{heading}</h3>
                    <p>{intro}</p>
                    <Link href={link}><a>Learn more</a></Link>
                </div>
            </div>
        </section>
    )
}
