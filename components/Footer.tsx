import React, {useContext} from "react";
// import Contact from './Contact'
// import ContactForm from './ContactForm'
import styles from "../styles/Footer.module.css";
import Link from "next/link";
import { AppContext } from "../context/AppContext";

export default function Footer() {
  const site = useContext(AppContext);
  console.log('site :>> ', site);

  const makeHttpsUrl = (url: string) => {
    return `https://${url}`;
  };

  const twitterUrl = makeHttpsUrl(site.twitter);
  const linkedinUrl = makeHttpsUrl(site.linkedIn);
  const githubUrl = makeHttpsUrl(site.github);

  return (
    <footer className={styles.mainFooter}>
      <div className={`${styles.mainFooterContainer} container`}>
        <h2>Get in touch</h2>
        <p>
          I'm always interested in hearing from you. You can get in touch
          through one of the channels listed or use the contact form here.
        </p>
        <div className={styles.mainFooterContacts}>
          {/* <ContactForm /> */}
          {/* <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSfkT8ht7_bzpinAmq_P7Jfk3UDtIwDhLAbPut57LJtSVIdARQ/viewform?embedded=true"
            width="500"
            height="900"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          >
            Loading…
          </iframe> */}
          <ul className={styles.contactList}>
            <li className={styles.contactListTwitter}>
              <Link href={twitterUrl}>{twitterUrl}</Link>
            </li>
            <li className={styles.contactListLinkedIn}>
              <Link href={linkedinUrl}>{linkedinUrl}</Link>
            </li>
            <li className={styles.contactListGithub}>
              <Link href={githubUrl}>{githubUrl}</Link>
            </li>
          </ul>
          {/* <Contact {...props} /> */}© {new Date().getFullYear()}, Mike
          Hansford.
        </div>
      </div>
    </footer>
  );
}
