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
  // ✅ Google Login
  googleLogin: async (googleToken, role) => {
    try {
      const response = await API.post("/auth/google", { token: googleToken, role });
      if (response.data.token) {
        localStorage.setItem("userToken", response.data.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        localStorage.setItem("userRole", role);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Google Login failed");
    }
  },

  // Logout User
  logout: () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("userRole");
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
  // ✅ Update Admin Profile
  updateAdminProfile: async (name, email) => {
    try {
      const response = await API.put("/auth/update-profile", { name, email });
      // Optionally update local storage userData
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const userData = JSON.parse(storedData);
        userData.name = response.data.admin.name;
        userData.email = response.data.admin.email;
        localStorage.setItem("userData", JSON.stringify(userData));
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
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
  // ✅ Delete Account
  deleteAccount: async () => {
    try {

      const response = await API.delete("/auth/delete-account");
      // Clear local storage after deleting account

      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      localStorage.removeItem("userRole");
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Account deletion failed");
    }
  },
};

export default authUser;
