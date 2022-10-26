import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import mockup from "../../assets/mockup.webp";

const Landing = () => {
  return (
    <div className="main bg-purple-500" style={{ height: "100vh" }}>
      <header className="header">
        <div className="max-w-screen-xl mx-auto my-0 pt-5">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-10 mr-3" />
            <h2 className="text-2xl font-bold text-white">Invoice App</h2>
          </div>
        </div>
      </header>
      <section className="max-w-screen-xl mx-auto landing-content">
        <div className="info ">
          <h1 className="font-bold text-white text-5xl mb-5">
            React Invoice App
          </h1>
          <p>
            React Invoice Application built with React and NodeJS. This project
            is designed by{" "}
            <a
              href="https://www.frontendmentor.io/"
              target="_blank"
              className="underline"
            >
              frontendmentor.io
            </a>{" "}
            and it's one of the challenges they have on their website.
          </p>
          <Link
            to="/register"
            className="mt-5 bg-black text-white w-fit px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer"
            type="button"
          >
            Login/Register
          </Link>
        </div>
        <img src={mockup} alt="" />
      </section>
    </div>
  );
};

export default Landing;
