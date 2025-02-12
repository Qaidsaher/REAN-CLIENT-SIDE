import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProfile, adminLogin, adminLogout } from "../services/authAdmin";

const AdminAuthContext = createContext(null); // ✅ Ensure the context has a default value

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const userData = localStorage.getItem("token");
      console.log("🔑 Stored token:", userData);

      if (userData) {
        try {
          const parsedToken = JSON.parse(userData);
          if (parsedToken?.token) {
            console.log("🔄 Fetching admin profile...");
            const profile = await getAdminProfile();
            console.log("✅ Admin profile received:", profile);
            setAdmin({ ...profile, role: "admin" }); // ✅ Assign "admin" role to every logged-in user
          }
        } catch (error) {
          console.error("⚠️ Error parsing token or fetching profile:", error);
          adminLogout();
          localStorage.clear()
        }
      }
      setLoading(false);
    };

    fetchAdminProfile();
  }, []);

  const loginAdmin = async (email, password) => {
    try {
      const data = await adminLogin(email, password);
      localStorage.setItem("token", JSON.stringify({ token: data.token }));
      setAdmin({ token: data.token, role: "admin" }); // ✅ Assign "admin" role to logged-in users
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("❌ Login failed:", error);
      throw new Error("Invalid email or password");
    }
  };

  const logoutAdmin = () => {
    console.log("🔴 Logging out admin...");
    adminLogout();
    localStorage.removeItem("token");
    setAdmin(null);
    navigate("/admin/login");
  };

  return (
    <AdminAuthContext.Provider value={{ admin, loginAdmin, logoutAdmin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// ✅ Correctly export the hook
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
