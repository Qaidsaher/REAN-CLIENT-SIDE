import React, { useState } from "react";
import InputField from "../../UI/InputField";

const Settings = ({ changePassword, deleteAccount }) => {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // 🔹 Handle Input Change
  const handleChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // 🔹 Validate Password Change
  const validatePasswords = () => {
    const newErrors = {};
    if (!passwordData.oldPassword)
      newErrors.oldPassword = "Old password is required.";
    if (!passwordData.newPassword)
      newErrors.newPassword = "New password is required.";
    if (passwordData.newPassword !== passwordData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";
    return newErrors;
  };

  // 🔹 Handle Change Password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const validations = validatePasswords();
    if (Object.keys(validations).length > 0) {
      setErrors(validations);
      return;
    }

    setLoading(true);
    try {
      await changePassword(passwordData);
     
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("❌ Error changing password:", error);
     
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle Delete Account Confirmation
  const confirmDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  // 🔹 Handle Final Delete Account Action
  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      await deleteAccount();
      alert("Your account has been deleted.");
      // Redirect or log out user
    } catch (error) {
      console.error("❌ Error deleting account:", error);
      alert("Failed to delete account.");
    } finally {
      setLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="p-2">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">⚙️ Settings</h2>

      <p className="text-gray-600 mb-6">
        Manage your account settings and security preferences.
      </p>

      {/* 🔹 Change Password Section */}
      <div className="bg-white shadow-md rounded-md p-4 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          🔒 Change Password
        </h3>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          {/* Old Password */}
          <InputField
            label="Old Password"
            name="oldPassword"
            type="password"
            value={passwordData.oldPassword}
            onChange={handleChange}
            error={errors.oldPassword}
          />
          {/* New Password */}
          <InputField
            label="New Password"
            name="newPassword"
            type="password"
            value={passwordData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
          />
          {/* Confirm Password */}
          <InputField
            label="Confirm New Password"
            name="confirmPassword"
            type="password"
            value={passwordData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <div className="flex justify-end space-x-4 mt-2">
          <button
            type="submit"
            className="px-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition"
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
          </div>
        </form>
      </div>

      {/* 🔹 Delete Account Section */}
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-xl font-semibold text-red-600 mb-4">
          🚨 Delete Account
        </h3>
        <p className="text-gray-700 mb-4">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <div className="flex justify-end space-x-4 mt-2">
          <button
            onClick={confirmDeleteAccount}
            className="px-4 bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* 🔹 Delete Account Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md text-center">
            <h3 className="text-xl font-bold text-red-600 mb-4">
              Confirm Deletion
            </h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
