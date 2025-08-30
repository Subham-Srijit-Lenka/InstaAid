import React from "react";
import Header from "./Header";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div className="bg-[#ffffff] min-h-screen">
      <Header />
      <main>{children}</main>
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
