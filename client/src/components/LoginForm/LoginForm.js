import React from "react";
import { useUserContext } from "../../context/user_context";

import { useForm } from "react-hook-form";

const LoginForm = () => {
  const {
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    handleLogin,
    demoLogin,
    loading,
  } = useUserContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form
        className="px-10 pt-12 w-full text-left"
        onSubmit={handleSubmit((e) => handleLogin(e))}
      >
        <div className="w-full flex flex-col">
          <label htmlFor="registerEmail" className="p-color">
            Email
          </label>
          <input
            type="text"
            id="registerEmail"
            name="registerEmail"
            value={loginEmail}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
            {...register("registerEmail", {
              required: "This field cannot be empty",
              onChange: (e) => setLoginEmail(e.target.value),
            })}
          />
          <div className="text-red-500 text-xs">
            {errors ? errors.registerEmail?.message : ""}
          </div>
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
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
            {...register("registerPassword", {
              required: "This field cannot be empty",
              onChange: (e) => setLoginPassword(e.target.value),
            })}
          />
          <div className="text-red-500 text-xs">
            {errors ? errors.registerPassword?.message : ""}
          </div>
        </div>
        <button
          className="mt-5 add-invoice px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer w-full"
          type="submit"
          disabled={loading ? true : false}
        >
          {loading ? "Please wait..." : "Login"}
        </button>
        <button
          className="mt-5 edit-invoice opacity-70 px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer w-full"
          type="button"
          onClick={(e) => demoLogin(e)}
          disabled={loading ? true : false}
        >
          {loading ? "Please wait..." : "Demo Login"}
        </button>
      </form>
    </>
  );
};

export default LoginForm;
