// 
import api from "../utils/api";


// ✅ Get user profile (used in AuthContext)
export const getProfile = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

// User Registration
export const register = async (userData) => {
  
  const response = await api.post("/innovator", userData);
  console.log(response.data)
  return response.data;

};
export const register1 = async (userData) => {
  alert(userData)
  const response = await api.post("/auth/register", userData);
  return response.data;
};

// User Login
export const login = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

// Forget Password - Send Reset Code
export const sendResetCode = async (email) => {
  const response = await api.post("/auth/forgot-password", { email });
  return response.data;
};

// Verify Reset Code
export const verifyResetCode = async (email, code) => {
  const response = await api.post("/auth/verify-reset-code", { email, code });
  return response.data;
};

// Change Password
export const changePassword = async (passwordData) => {
  const response = await api.post("/auth/change-password", passwordData);
  return response.data;
};

// Google Sign-In
export const googleSignIn = async (token) => {
  const response = await api.post("/auth/google-signin", { token });
  return response.data;
};

// X (Twitter) Sign-In
export const twitterSignIn = async (token) => {
  const response = await api.post("/auth/x-signin", { token });
  return response.data;
};

// Verify Email
export const verifyEmail = async (email) => {
  const response = await api.post("/auth/verify-email", { email });
  return response.data;
};

// Logout
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// verifyEmail, resendVerificationEmail
/**
 * Reset Password Service
 * @param {string} newPassword - The new password entered by the user.
 * @returns {Promise} - Resolves when password reset is successful.
 */
export const resetPassword = async (newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", { password: newPassword });
    return response.data; // ✅ Successfully changed password
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error.response?.data || { message: "Failed to reset password." };
  }
};