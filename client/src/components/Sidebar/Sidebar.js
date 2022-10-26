import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";
import userImage from "../../assets/image-avatar.jpg";

import { useUserContext } from "../../context/user_context";

import { FaSun } from "react-icons/fa";
import { IoMoonOutline } from "react-icons/io5";

const Sidebar = () => {
  const [themeState, setThemeState] = useState(false);
  const { token } = useUserContext();

  useEffect(() => {
    const getTheme = localStorage.getItem("Theme");
    if (getTheme === "dark") {
      setThemeState(true);
    }
  }, []);

  useEffect(() => {
    if (themeState) {
      localStorage.setItem("Theme", "dark");
      document.body.classList.add("dark-mode");
    } else {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }

    if (!token) {
      localStorage.setItem("Theme", "light");
      document.body.classList.remove("dark-mode");
    }
  }, [themeState]);
  return (
    <div className="container">
      {token && (
        <div className="sidebar fixed top-0 left-0 h-full flex flex-col justify-between pb-5">
          <div className="logo flex justify-center p-10">
            <Link to="/invoices">
              <img src={logo} alt="invoice app" />
            </Link>
          </div>
          <div className="sidebar-bottom">
            <div className="mode-switch py-8">
              <button onClick={() => setThemeState(!themeState)}>
                {themeState ? (
                  <>
                    <FaSun />
                  </>
                ) : (
                  <>
                    <IoMoonOutline />
                  </>
                )}
              </button>
            </div>
            <div className="user flex justify-center">
              <Link to="/">
                <img
                  src={userImage}
                  alt="user image"
                  className="rounded-full w-10"
                />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
