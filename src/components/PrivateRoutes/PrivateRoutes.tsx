import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("authUser");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoutes;
