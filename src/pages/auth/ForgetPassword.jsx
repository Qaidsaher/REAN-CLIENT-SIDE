import React, { useState } from "react";
import { sendResetCode } from "@/services/authService"; // ✅ Import service
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear error message when typing
  };

  // Validate Email
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email); // Simple email validation
  };

  // Handle Form Submission
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

    setLoading(true);

    // Simulate API call for 3 seconds
    setTimeout(async () => {
      try {
        await sendResetCode(email);
        setSuccessMessage("A reset code has been sent to your email.");
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
            Enter your email to receive a reset code.
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
