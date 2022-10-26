import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import userImage from "../../assets/image-avatar.jpg";
import { useUserContext } from "../../context/user_context";

const Profile = () => {
  const { loginName, handleLogout } = useUserContext();

  return (
    <div className="container section">
      <div className="content-top  text-center">
        <div className="content-top-left">
          <h1 className="text-4xl font-bold md:text-2xl">User profile</h1>
        </div>
      </div>
      <section className="mt-10 flex flex-col gap-5 text-center items-center">
        <div className="user flex justify-center">
          <img src={userImage} alt="user image" className="rounded-full w-20" />
        </div>
        <p className="p-color">
          Welcome back, {loginName}. Please check your{" "}
          <Link
            to="/invoices/"
            className="text-purple-500 font-medium underline"
          >
            invoices.
          </Link>
        </p>
        <button
          className="mt-5 add-invoice px-4 py-2 rounded-3xl font-bold flex justify-center items-center cursor-pointer"
          type="submit"
          onClick={(e) => handleLogout(e)}
        >
          Log out
        </button>
      </section>
    </div>
  );
};

export default Profile;
