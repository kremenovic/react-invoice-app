import React from "react";
import { useUserContext } from "../../context/user_context";

import { useForm } from "react-hook-form";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form
        className="px-10 pt-12 w-full text-left"
        onSubmit={handleSubmit((e) => handleRegistration(e))}
      >
        <div className="w-full flex flex-col">
          <label htmlFor="registerName" className="p-color">
            Name
          </label>
          <input
            type="text"
            id="registerName"
            name="registerName"
            value={registerName}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
            {...register("registerName", {
              required: "This field cannot be empty",
              onChange: (e) => setRegisterName(e.target.value),
            })}
          />
          <div className="text-red-500 text-xs">
            {errors ? errors.registerName?.message : ""}
          </div>
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
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
            {...register("registerEmail", {
              required: "This field cannot be empty",
              onChange: (e) => setRegisterEmail(e.target.value),
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
            value={registerPassword}
            className="border h-12 mt-2 px-3 focus:outline-none focus:border-purple-500 rounded-lg"
            {...register("registerPassword", {
              required: "This field cannot be empty",
              onChange: (e) => setRegisterPassword(e.target.value),
            })}
          />
          <div className="text-red-500 text-xs">
            {errors ? errors.registerPassword?.message : ""}
          </div>
        </div>
        <button
          className="mt-5 add-invoice px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer w-full"
          type="submit"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
