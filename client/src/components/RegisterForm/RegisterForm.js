import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const URL = `http://localhost:8080/api/`;

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${URL}register`, { name, email, password })
      .then(() => {
        axios.post(`${URL}login`, { email, password }).then(() => {
          alert("Succesfully registered");
          window.location.href = "/invoices";
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
