
import { createContext, useState, useEffect, useContext } from "react";
import authUser from "../services/authUser";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("userToken") || null);
  const [role, setRole] = useState(localStorage.getItem("userRole") || null);
  const navigate = useNavigate();

  // ✅ Register function (Includes Admin)
  const register = async (formData) => {
    try {
      const data = await authUser.register(formData);
      console.log("✅ Registered Successfully:", JSON.stringify(data));
      setUser(data.user);
      setToken(data.token);
      setRole(formData.role);

      // ✅ Store user data, token & role in localStorage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("userRole", formData.role);
      fetchProfile(data.token);

      // ✅ Auto-login & redirect after successful registration
      navigate(
        formData.role === "admin"
          ? "/admin/dashboard"
          : formData.role === "innovator"
            ? "/dashboard-innovator"
            : "/dashboard-investor"
      );

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ✅ Login function (Includes Admin)
  const login = async (email, password, role) => {
    try {
      const data = await authUser.login(email, password, role);
      setUser(data.user);
      setToken(data.token);
      setRole(role);

      // ✅ Store user data, token & role in localStorage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("userRole", role);

      // ✅ Fetch user profile after login
      fetchProfile(data.token);

      // ✅ Redirect based on role
      navigate(
        role === "admin"
          ? "/admin/dashboard"
          : role === "innovator"
            ? "/dashboard-innovator"
            : "/dashboard-investor"
      );

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ✅ Google Login function
  const googleLogin = async (googleToken, role) => {
    try {
      const data = await authUser.googleLogin(googleToken, role);
      setUser(data.user);
      setToken(data.token);
      setRole(role);

      // ✅ Store user data, token & role in localStorage
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      localStorage.setItem("userRole", role);

      // ✅ Fetch user profile after login
      fetchProfile(data.token);

      // ✅ Redirect based on role
      navigate(
        role === "admin"
          ? "/admin/dashboard"
          : role === "innovator"
            ? "/dashboard-innovator"
            : "/dashboard-investor"
      );

      return { success: true, user: data.user };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  // ✅ Fetch Profile Function
  const fetchProfile = async (token) => {
    try {
      const userProfile = await authUser.getUser(token);
      setProfile(userProfile);
    } catch (error) {
      console.error("❌ Error fetching profile:", error.message);
      logout();
    }
  };

  // ✅ Change Password Function
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const data = await authUser.changePassword(oldPassword, newPassword);
      console.log("✅ Password changed successfully");
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      console.error("❌ Error changing password:", error.message);
      return { success: false, message: error.message };
    }
  };

  // ✅ Delete Account Function
  const deleteAccount = async () => {
    try {
      await authUser.deleteAccount();
      console.log("✅ Account deleted successfully");

      // ✅ Clear user data from state & localStorage
      setUser(null);
      setProfile(null);
      setToken(null);
      setRole(null);
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("userRole");

      navigate("/goodbye"); // ✅ Redirect to a goodbye page after account deletion
      return { success: true, message: "Account deleted successfully" };
    } catch (error) {
      console.error("❌ Error deleting account:", error.message);
      return { success: false, message: error.message };
    }
  };

  // ✅ Logout function
  const logout = () => {
    authUser.logout();
    setUser(null);
    setProfile(null);
    setToken(null);
    setRole(null);
    navigate("/login");
  };

  // ✅ Fetch user & profile on app load
  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        role,
        register,
        login,
        googleLogin,
        logout,
        changePassword, // ✅ Added Change Password
        deleteAccount, // ✅ Added Delete Account
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export the custom hook for easy access
export const useAuth = () => useContext(AuthContext);
