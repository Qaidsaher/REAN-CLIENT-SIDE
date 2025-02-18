import React, { useState } from "react";
import authUser from "@/services/authUser";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!role) {
      setError("Please select a role before submitting.");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        await authUser.forgotPassword(email, role);
        setSuccessMessage(`A reset code has been sent to your email for role: ${role}.`);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to send reset code.");
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  return (
    <GuestLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-6">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
            Forgot Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your email and select your role to receive a reset code.
          </p>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              error={error}
            />

            <div className="flex justify-start gap-4 mb-4">
              <div
                className={`border-1 px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                  role === "innovator" ? "border-blue-500 bg-blue-500 text-white" : "border-blue-300"
                }`}
                onClick={() => setRole("innovator")}
              >
                Innovator
              </div>
              <div
                className={`border-1 px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                  role === "investor" ? "border-green-500 bg-green-500 text-white" : "border-green-300"
                }`}
                onClick={() => setRole("investor")}
              >
                Investor
              </div>
              <div
                className={`border-1 px-2 py-0.5 rounded-md cursor-pointer transition-all ${
                  role === "admin" ? "border-red-500 bg-red-500 text-white" : "border-red-300"
                }`}
                onClick={() => setRole("admin")}
              >
                Admin
              </div>
            </div>

            <Button
              type="submit"
              text={
                loading ? <LoadingSpinner color="white" /> : "Send Reset Code"
              }
              variant="indigo"
              className="w-full"
              disabled={loading}
            />
          </form>

          <div className="text-center mt-4">
            <Link to="/login" className="text-indigo-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default ForgetPassword;
