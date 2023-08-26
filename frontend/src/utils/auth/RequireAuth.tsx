import { useLocation, Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext";

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
