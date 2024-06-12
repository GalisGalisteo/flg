import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LoginContext } from "./LoginContextProvider";

export const ProtectedRoute = () => {
  const loginContext = useContext(LoginContext);

  if (!loginContext?.isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
