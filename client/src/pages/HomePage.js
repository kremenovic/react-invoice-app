import React from "react";
import Profile from "../components/Profile/Profile";
import Landing from "../components/Landing/Landing";

import { useUserContext } from "../context/user_context";

const HomePage = () => {
  const { token } = useUserContext();

  return <>{token ? <Profile /> : <Landing />}</>;
};

export default HomePage;
