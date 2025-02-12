import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const PrivateAdminRoutes = ({ allowedRoles }) => {
  const auth = useAdminAuth(); // ✅ Store context first
  if (!auth) {
    console.error("🚨 useAdminAuth is undefined! Ensure AdminAuthProvider is wrapping the app.");
    return <Navigate to="/admin/login" replace />;
  }

  const { admin, loading } = auth;

  console.log("🔎 Checking admin in PrivateAdminRoutes:", admin);

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (!admin) {
    console.warn("🚨 No admin found! Redirecting to login.");
    return <Navigate to="/admin/login" replace />;
  }

  if (!allowedRoles.includes(admin.role)) {
    console.warn(`🚫 Access Denied! Admin role: ${admin.role}`);
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateAdminRoutes;
