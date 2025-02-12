import React, { useState } from "react";
import { resetPassword } from "@/services/authService"; // ✅ Import API service
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate(); // ✅ Redirect after successful reset

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear errors when typing
  };

  // Validate Input Fields
  const validate = () => {
    if (!formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    return true;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    if (!validate()) return;

    setLoading(true);

    setTimeout(async () => {
      try {
        await resetPasswordService(formData.password);
        setSuccessMessage("Password reset successfully!");
        setFormData({ password: "", confirmPassword: "" });

        // Redirect to login page after successful password reset
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        setError(error.response?.data?.message || "Failed to reset password.");
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
            Reset Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter your new password below.
          </p>

          {/* {error && <p className="text-red-600 text-center mb-4">{error}</p>} */}
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="New Password"
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              error={error}
            />
            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={error}
            />

            <Button
              type="submit"
              text={
                loading ? <LoadingSpinner color="white" /> : "Reset Password"
              }
              variant="indigo"
              className="w-full"
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default ResetPassword;
