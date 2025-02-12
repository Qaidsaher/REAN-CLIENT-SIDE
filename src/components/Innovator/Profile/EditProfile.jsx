import React, { useState, useEffect } from "react";
import InputField from "../../UI/InputField";
import { FaCamera, FaUserEdit } from "react-icons/fa";
const EditProfile = ({ profile, updateProfile }) => {
  const [formData, setFormData] = useState(profile || {});
  const [errors, setErrors] = useState({});
  const [photoPreview, setPhotoPreview] = useState(profile?.photo || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      const image = "http://localhost:5000" + profile?.photo;
      setFormData(profile);
      setPhotoPreview(image);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo" && files && files[0]) {
      setFormData({ ...formData, photo: files[0] });
      setPhotoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName?.trim())
      newErrors.firstName = "First Name is required.";
    if (!formData.lastName?.trim())
      newErrors.lastName = "Last Name is required.";
    if (!formData.email?.trim()) newErrors.email = "Email is required.";
    if (!formData.phone?.trim()) newErrors.phone = "Phone number is required.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = validate();
    if (Object.keys(validations).length > 0) {
      setErrors(validations);
      return;
    }

    setLoading(true);
    try {
      await updateProfile(formData);
      // alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("❌ Error updating profile:", error);
      // alert("⚠️ Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Title with Icon */}
      <h2 className="text-3xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <FaUserEdit size={25} className="text-indigo-600" /> Edit Profile
      </h2>

      {/* Profile Header with Avatar */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-indigo-400 pb-6 my-4">
        <div className="relative group">
          <img
            src={photoPreview || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-2 border-indigo-600 shadow-lg transition-all duration-300 hover:scale-105"
          />
          {/* Camera Icon for Upload */}
          <label
            htmlFor="photo"
            className="absolute bottom-2 right-2 bg-indigo-600 text-white p-2 rounded-full shadow-md cursor-pointer transition-all duration-300 hover:bg-indigo-700 hover:scale-110"
          >
            <FaCamera size={20} />
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <InputField
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          {/* ✅ Bio Field (New) */}
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2 font-semibold">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Write something about yourself..."
            />
          </div>
          <InputField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            label="Phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <InputField
            label="Birthday"
            name="birthday"
            type="date"
            value={formData.birthday.split("T")[0]}
            onChange={handleChange}
          />
          <InputField
            label="City"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
          <InputField
            label="Education"
            name="education"
            type="text"
            value={formData.education}
            onChange={handleChange}
          />
          <InputField
            label="Account X"
            name="accountX"
            type="text"
            value={formData.accountX}
            onChange={handleChange}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
