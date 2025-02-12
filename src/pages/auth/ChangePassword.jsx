import React, { useState } from "react";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { changePassword } from "@/services/authService";
import GuestLayout from "../../layouts/GuestLayout";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear errors when typing
  };

  // Validate Input Fields
  const validate = () => {
    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match.");
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
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

    // Simulate API call for 3 seconds
    setTimeout(async () => {
      try {
        await changePasswordService(formData);
        setSuccessMessage("Password changed successfully.");
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (error) {
        setError(error.response?.data?.message || "Failed to change password.");
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
            Change Password
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Secure your account by updating your password.
          </p>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Current Password"
              type="password"
              name="currentPassword"
              placeholder="Enter current password"
              value={formData.currentPassword}
              onChange={handleChange}
              error={error}
            />
            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
              error={error}
            />
            <InputField
              label="Confirm New Password"
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
                loading ? <LoadingSpinner color="white" /> : "Change Password"
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

export default ChangePassword;
