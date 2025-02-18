import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaUpload, FaSpinner, FaExclamationCircle, FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import TextAreaField from "../../../components/UI/TextAreaField";
import InputField from "../../../components/UI/InputField";
import { getInnovationById, updateInnovation } from "../../../services/innovators";
import { getCategories, getInnovators } from "../../../services/websiteService";
import { motion } from "framer-motion";
import AdminLayout from "../../../layouts/AdminLayout";

const EditInnovation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [innovators, setInnovators] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchInnovation();
    fetchCategoriesAndInnovators();
  }, []);

  const fetchInnovation = async () => {
    try {
      const data = await getInnovationById(id);
      setFormData(data);
      setImagePreview(data.image ? `http://localhost:5000${data.image}` : null);
      setStatus(data.status);
    } catch (error) {
      console.error("❌ Error fetching innovation:", error);
    }
  };

  const fetchCategoriesAndInnovators = async () => {
    try {
      const categoriesData = await getCategories();
      setCategories(categoriesData);

      const innovatorsData = await getInnovators();
      setInnovators(innovatorsData);
    } catch (error) {
      console.error("❌ Error fetching categories or innovators:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name?.trim()) validationErrors.name = "Innovation Name is required.";
    if (!formData.description?.trim()) validationErrors.description = "Short Description is required.";
    if (!formData.details?.trim()) validationErrors.details = "Details are required.";
    if (!formData.cost?.trim()) validationErrors.cost = "Cost is required.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      await updateInnovation(id, { ...formData, status });
      navigate("/innovator/innovations");
    } catch (error) {
      console.error("❌ Error updating innovation:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatus(newStatus);
    try {
      await updateInnovation(id, { ...formData, status: newStatus });
    } catch (error) {
      console.error("❌ Error updating status:", error);
    }
  };

  if (!formData) {
    return <p className="text-center text-gray-600">Loading innovation details...</p>;
  }

  return (
    <AdminLayout selectedNav={"innovations"}>
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-md shadow-md">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 flex items-center gap-2"
        >
          <FaEdit className="text-indigo-600" /> Edit Innovation
        </motion.h2>

        {/* Status Buttons */}
        <div className="mb-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => handleStatusChange("accepted")}
            className={`px-2 py-1 font-semibold border-1 rounded-md transition-all duration-300 ${status === "Accepted"
                ? "border-green-500 bg-green-500 text-white"
                : "border-green-500 text-green-500 hover:border-green-600 hover:text-green-600"
              }`}
          >
            <FaCheckCircle className="inline mr-2" />
            Accepted
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange("pending")}
            className={`px-2 py-1 font-semibold border-1 rounded-md transition-all duration-300 ${status === "Pending"
                ? "border-yellow-500 bg-yellow-500 text-white"
                : "border-yellow-500 text-yellow-500 hover:border-yellow-600 hover:text-yellow-600"
              }`}
          >
            <FaClock className="inline mr-2" />
            Pending
          </button>

          <button
            type="button"
            onClick={() => handleStatusChange("rejected")}
            className={`px-2 py-1 font-semibold border-1 rounded-md transition-all duration-300 ${status === "Rejected"
                ? "border-red-500 bg-red-500 text-white"
                : "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600"
              }`}
          >
            <FaTimesCircle className="inline mr-2" />
            Rejected
          </button>
        </div>


        {/* Current Status Display */}
        <div className="mb-4">
          <span className="text-lg font-bold">Current Status: </span>
          <span
            className={`px-3 py-1 text-white rounded ${status === "Accepted"
                ? "bg-green-600"
                : status === "Pending"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Layout for Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Innovation Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            <InputField
              label="Cost ($)"
              name="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
              error={errors.cost}
            />

            <div className="col-span-2">
              <TextAreaField
                label="Short Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                error={errors.description}
              />
              <TextAreaField
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleChange}
                error={errors.details}
              />
            </div>

            {/* Category Dropdown (Disabled) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                disabled
                className="w-full border bg-gray-200 cursor-not-allowed border-gray-300 rounded-lg p-3"
              >
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id} selected={formData.category === cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Innovator Dropdown (Disabled) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Innovator</label>
              <select
                name="innovator"
                value={formData.innovator}
                disabled
                className="w-full border bg-gray-200 cursor-not-allowed border-gray-300 rounded-lg p-3"
              >
                {innovators.map((innovator) => (
                  <option key={innovator._id} value={innovator._id} selected={formData.innovator === innovator._id}>
                    {innovator.firstName} {innovator.lastName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-4">
            <label className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition">
              <FaUpload />
              Upload Image
              <input type="file" name="image" accept="image/*" className="hidden" onChange={handleChange} />
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-md border shadow-md" />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`flex justify-center items-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition ${loading ? "cursor-not-allowed opacity-80" : ""
              }`}
            disabled={loading}
          >
            {loading ? <><FaSpinner className="animate-spin mr-2" /> Updating...</> : "Save Changes"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default EditInnovation;
