import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { verify } = useAuth();

  const { data: loggedIn, isLoading } = useQuery("authStatus", verify);

  if (!isLoading) return loggedIn ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
