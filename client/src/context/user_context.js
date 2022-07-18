import React, { useContext, useState, useReducer } from "react";
import reducer from "../reducers/user_reducer";
import { USER_LOGIN_INFO, USER_REGISTER_INFO } from "../actions";

const UserContext = React.createContext();

const initialState = {};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [state, dispatch] = useReducer(reducer, initialState);

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};
export const useUserContext = () => {
  return useContext(UserContext);
};
