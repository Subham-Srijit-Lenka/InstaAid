import React from "react";
import Header from "./Header";
import Footer from "./Footer";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="bg-[#ffffff] min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "Instaaid",
  description: "mern stack project",
  keywords: "mern,react,node,mongodb,firstaid",
  author: "Subham Srijit Lenka",
};

export default Layout;
