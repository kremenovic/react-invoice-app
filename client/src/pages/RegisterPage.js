import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm/RegisterForm";
import LoginForm from "../components/LoginForm/LoginForm";

const RegisterPage = () => {
  const [showRegister, setShowRegister] = useState(false);
  return (
    <div className="container section">
      <div className="content-top  text-center">
        <div className="content-top-left">
          <h1 className="text-4xl font-bold md:text-xl">
            {showRegister ? "Register" : "Login"}
          </h1>
        </div>
      </div>
      <section className="mt-10 flex flex-col gap-5 text-center items-center">
        <div className="lg:w-3/5 inner-section bg-white w-full form-shadow rounded-md">
          {showRegister ? <RegisterForm /> : <LoginForm />}
          <p className="text-center mt-8 pb-12">
            {showRegister ? "Already a member?" : "Not a member yet?"}{" "}
            <button
              onClick={() => setShowRegister(!showRegister)}
              className="text-purple-500 font-medium"
            >
              {showRegister ? "Login" : "Register"}
            </button>
          </p>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
