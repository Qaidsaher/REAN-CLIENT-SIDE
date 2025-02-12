import API from "../utils/userApi";
import { getProfile } from "./authAdmin";

const authUser = {
  // Register User
  register: async (userData) => {
    try {
      const response = await API.post("/auth/register", userData);
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("userRole", response.data.role);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
  },

  // Login User
  login: async (email, password, role) => {
    try {
      const response = await API.post("/auth/login", { email, password, role });
      if (response.data.token) {
        // localStorage.setItem("token", response.data.token);
        // localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("userRole", role);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  },

  // Logout User
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  // Get Authenticated User
  getUser: async () => {
    try {
      const response = await API.get("/auth/me");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  },

  // Change Password
  changePassword: async (oldPassword, newPassword) => {
    try {
      const response = await API.put("/auth/change-password", {
        oldPassword,
        newPassword,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
  },

  // Forgot Password
  forgotPassword: async (email, role) => {
    try {
      const response = await API.post("/auth/forgot-password", { email, role });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response?.data?.message || "Failed to send password reset email"
      );
    }
  },

  // Reset Password
  resetPassword: async (token, newPassword, role) => {
    try {
      const response = await API.post("/auth/reset-password", {
        token,
        newPassword,
        role,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Password reset failed");
    }
  },
  getProfile: async () => {
    const response = await API.get(`${API_URL}/profile`);
    return response.data;
  },
};

export default authUser;
