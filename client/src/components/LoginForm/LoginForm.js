import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // set configurations
  const configuration = {
    method: "post",
    url: "http://localhost:8080/api/login",
    data: {
      email,
      password,
    },
  };

  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    // make a popup alert showing the "submitted" text
    axios(configuration)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form className="px-10 pt-12 w-full text-left">
        <div className="w-full flex flex-col">
          <label htmlFor="registerEmail" className="p-color">
            Email
          </label>
          <input
            type="text"
            id="registerEmail"
            name="registerEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="registerPassword" className="p-color">
            Password
          </label>
          <input
            type="password"
            id="registerPassword"
            name="registerPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          />
        </div>
        <button
          className="mt-5 add-invoice px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer w-full"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
