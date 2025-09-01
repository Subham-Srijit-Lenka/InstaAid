import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h2 className="text-lg font-semibold text-white">About InstaAid</h2>
          <p className="text-sm text-gray-400 mt-1 max-w-md">
            InstaAid is a platform dedicated to making aid and support more
            accessible. Our goal is to connect people and resources efficiently.
          </p>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} InstaAid. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
