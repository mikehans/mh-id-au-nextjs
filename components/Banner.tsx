import React from 'react'
// import styles from './Banner.module.css'

export default function Banner({siteTitle, subTitle}) {
    return (
        <section className="container mx-auto pt-24">
            {/* <div className="logo">
                <span className="icon fa-gem"></span>
            </div> */}
            <h2 className="border-b-2">{siteTitle}</h2>
            <p className="text-base font-subtitle uppercase my-4">{subTitle}</p>
        </section>
    )
}
