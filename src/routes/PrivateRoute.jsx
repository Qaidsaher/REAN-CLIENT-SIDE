import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // ✅ Use custom hook

const PrivateRoute = ({ allowedRoles }) => {
  const { user, role } = useAuth(); // ✅ Use useAuth()

  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ Check if the user has permission to access the route
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
