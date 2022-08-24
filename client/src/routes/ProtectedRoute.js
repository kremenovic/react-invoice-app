import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";

export const ProtectedRoute = ({ children }) => {
  const { token } = useUserContext();
  if (!token) {
    return <Navigate to="/register" />;
  }
  return children;
};
