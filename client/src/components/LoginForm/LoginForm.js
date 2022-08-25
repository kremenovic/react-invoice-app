import React, { useState } from "react";
import { useUserContext } from "../../context/user_context";

const LoginForm = () => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
  } = useUserContext();

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
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
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
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          />
        </div>
        <button
          className="mt-5 add-invoice px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer w-full"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
