import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const token = cookies.get("TOKEN");

  return (
    <UserContext.Provider value={{ token }}>{children}</UserContext.Provider>
  );
};
export const useUserContext = () => {
  return useContext(UserContext);
};
