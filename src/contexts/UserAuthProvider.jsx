// src/contexts/UserAuthProvider.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
// Import jwt-decode as a named import if necessary
// import jwtDecode from "jwt-decode";
import { jwtDecode } from 'jwt-decode';  // ✅ Correct

export const UserAuthContext = createContext();

/**
 * A generic authentication provider.
 *
 * @param {Object} props
 * @param {"admin"|"innovator"|"investor"} props.role – the role of the user for this provider.
 * @param {React.ReactNode} props.children – child components.
 */
export const UserAuthProvider = ({ role, children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for an existing token on mount (keyed by role)
  useEffect(() => {
    const storedToken = localStorage.getItem(`${role}Token`);
    if (storedToken) {
      setToken(storedToken);
      try {
        const decoded = jwtDecode(storedToken);
        // Assuming the token payload contains at least an "id" field
        setUser({ id: decoded.id, role, ...decoded });
      } catch (err) {
        console.error("Token decoding error", err);
        localStorage.removeItem(`${role}Token`);
      }
    }
    setLoading(false);
  }, [role]);

  // Login function calling the Node.js API
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      // The login endpoint in your Node.js authController expects { email, password, role }
      const response = await axios.post(
        "https://api.example.com/api/auth/login",
        { email, password, role }
      );
      // Expecting response.data in the format: { message: "Login successful", token: "JWT_TOKEN" }
      const { token: jwtToken } = response.data;
      localStorage.setItem(`${role}Token`, jwtToken);
      setToken(jwtToken);
      const decoded = jwtDecode(jwtToken);
      setUser({ id: decoded.id, role, ...decoded });
    } catch (err) {
      console.error("Login error:", err);
      // Use error response message if available
      setError(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  // Registration function calling the proper endpoint based on role.
  const register = async (registrationData) => {
    setLoading(true);
    setError(null);
    try {
      let endpoint;
      if (role === "admin") {
        // Use dedicated admin registration endpoint
        endpoint = "https://api.example.com/api/admin/register";
      } else {
        // Otherwise use a generic registration endpoint (adjust as needed)
        endpoint = "https://api.example.com/api/auth/register";
      }
      const response = await axios.post(endpoint, registrationData);
      // Expecting response.data in the format: { message: "Registration successful", token: "JWT_TOKEN" }
      const { token: jwtToken } = response.data;
      localStorage.setItem(`${role}Token`, jwtToken);
      setToken(jwtToken);
      const decoded = jwtDecode(jwtToken);
      setUser({ id: decoded.id, role, ...decoded });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Registration error");
    } finally {
      setLoading(false);
    }
  };

  // Logout function: clear stored token and user data
  const logout = () => {
    localStorage.removeItem(`${role}Token`);
    setUser(null);
    setToken(null);
  };

  return (
    <UserAuthContext.Provider
      value={{ user, token, loading, error, login, register, logout }}
    >
      {children}
    </UserAuthContext.Provider>
  );
};
