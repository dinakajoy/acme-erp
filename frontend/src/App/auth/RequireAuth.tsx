import {
  useLocation,
  Navigate,
} from "react-router-dom";
import { selectCurrentUser } from "../../redux/slices/authSlice";


function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  console.log('selectCurrentUser', selectCurrentUser);

  if (!selectCurrentUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;