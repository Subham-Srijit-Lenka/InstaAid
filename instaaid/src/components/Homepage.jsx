import React from "react";
import Layout from "./layout/Layout.jsx";
import { Link } from "react-router-dom";
const Homepage = () => {
  return (
    <Layout>
      <section className="hero flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-12 ">
        <div className="text-center md:text-left max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Your Health is our <span className="text-blue-600">Focus</span>
          </h1>
          <h2 className="text-lg md:text-xl text-gray-600">
            Order medicines, and get AI-based recommendations — all from your
            home.
          </h2>
          <Link to="/chatbot">
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-xl shadow-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </Link>
        </div>

        <div className="mb-8 md:mb-0 md:w-1/2 flex justify-center">
          <img
            src="./hero.png"
            alt="First-Aid"
            className="w-80 md:w-full max-w-md"
          />
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
