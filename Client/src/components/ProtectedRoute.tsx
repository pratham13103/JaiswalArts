import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true"; // Or use a context if you have one
  return isAdmin ? <>{children}</> : <Navigate to="/admin-login" replace />;
};

export default ProtectedRoute;
