import { Navigate, Outlet } from "react-router-dom";
import { useGetAuthDataQuery } from "../api/services/authapi";

const ProtectedRoute = () => {
  const { data } = useGetAuthDataQuery();

  const token =
    data?.token || localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
