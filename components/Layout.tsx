import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props) {
  return (
    <div className="flex-wrapper">
      <Header
        title={props.title || `Title`}
        subtitle={props.subtitle || `Subtitle`}
      />

      <Banner
        siteTitle={props.title ||`Title`}
        subTitle={props.subtitle || `Subtitle`}
      />

      <section className="main container">
        <main className="content">{props.children}</main>
      </section>
      <Footer />
    </div>
  );
}

export default Layout;