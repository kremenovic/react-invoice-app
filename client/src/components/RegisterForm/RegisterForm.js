import React, { useState } from "react";
import { useUserContext } from "../../context/user_context";

const RegisterForm = () => {
  const {
    registerName,
    registerEmail,
    registerPassword,
    setRegisterName,
    setRegisterEmail,
    setRegisterPassword,
    handleRegistration,
  } = useUserContext();

  return (
    <>
      <form className="px-10 pt-12 w-full text-left">
        <div className="w-full flex flex-col">
          <label htmlFor="registerName" className="p-color">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            name="registerName"
            value={registerName}
            onChange={(e) => setRegisterName(e.target.value)}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          />
        </div>
        <div className="w-full flex flex-col mt-5">
          <label htmlFor="registerEmail" className="p-color">
            Email
          </label>
          <input
            type="email"
            id="registerEmail"
            name="registerEmail"
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
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
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
          />
        </div>
        <button
          className="mt-5 add-invoice px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer w-full"
          type="submit"
          onClick={(e) => handleRegistration(e)}
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
