import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaUpload, FaVideo, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import TextAreaField from "../../../components/UI/TextAreaField";
import InputField from "../../../components/UI/InputField";
import { createInnovation } from "../../../services/admins/innovationService";
import { getCategories, getInnovators } from "../../../services/websiteService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "../../../layouts/AdminLayout";

const CreateInnovation = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    details: "",
    category: "",
    innovator: "",
    status: "",
    image: null,
    video: null,
  });

  const [categories, setCategories] = useState([]);
  const [innovators, setInnovators] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        const innovatorsData = await getInnovators();
        setInnovators(innovatorsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else if (name === "video" && files[0]) {
      setFormData({ ...formData, video: files[0] });
      setVideoPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" }); // Clear errors on input change
  };

  // Validate required fields
  const validateForm = () => {
    let validationErrors = {};
    if (!formData.name.trim()) validationErrors.name = "Innovation Name is required.";
    if (!formData.description.trim()) validationErrors.description = "Short Description is required.";
    if (!formData.details.trim()) validationErrors.details = "Details are required.";
    if (!formData.cost.trim()) validationErrors.cost = "Cost is required.";
    if (!formData.category.trim()) validationErrors.category = "Please select a category.";
    if (!formData.innovator.trim()) validationErrors.innovator = "Please select an innovator.";
    if (!formData.status.trim()) validationErrors.status = "Please select a status.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      await createInnovation(formData);
      navigate("/admin/innovations");
    } catch (error) {
      console.error("Error creating innovation:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout selectedNav={"innovations"}>
      <div className="p-8 bg-white rounded-md shadow-md">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 flex items-center gap-2"
        >
          <FaPlusCircle className="text-indigo-600" /> Create Innovation
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Layout for Responsive Inputs */}
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

            {/* Category Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`w-full border ${errors.category ? "border-red-500" : "border-gray-300"} rounded-lg p-3 transition focus:ring-indigo-500`}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="text-red-500 text-sm mt-1"><FaExclamationCircle className="inline" /> {errors.category}</p>}
            </div>

            {/* Innovator Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Innovator</label>
              <select
                name="innovator"
                value={formData.innovator}
                onChange={handleChange}
                className={`w-full border ${errors.innovator ? "border-red-500" : "border-gray-300"} rounded-lg p-3 transition focus:ring-indigo-500`}
              >
                <option value="">Select an innovator</option>
                {innovators.map((innovator) => (
                  <option key={innovator._id} value={innovator._id}>
                    {innovator.firstName} {innovator.lastName}
                  </option>
                ))}
              </select>
              {errors.innovator && <p className="text-red-500 text-sm mt-1"><FaExclamationCircle className="inline" /> {errors.innovator}</p>}
            </div>
          </div>

          {/* Status Field with Colorful Radio Buttons */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Status</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Accepted"
                  checked={formData.status === "Accepted"}
                  onChange={handleChange}
                  className="hidden"
                  id="status-accepted"
                />
                <span className={`px-4 py-2 border-2 rounded-lg cursor-pointer transition ${
                  formData.status === "Accepted"
                    ? "border-green-700 text-green-700"
                    : "border-green-500 text-green-500 hover:border-green-600 hover:text-green-600"
                }`}>
                  Accepted
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Pending"
                  checked={formData.status === "Pending"}
                  onChange={handleChange}
                  className="hidden"
                  id="status-pending"
                />
                <span className={`px-4 py-2 border-2 rounded-lg cursor-pointer transition ${
                  formData.status === "Pending"
                    ? "border-yellow-700 text-yellow-700"
                    : "border-yellow-500 text-yellow-500 hover:border-yellow-600 hover:text-yellow-600"
                }`}>
                  Pending
                </span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Rejected"
                  checked={formData.status === "Rejected"}
                  onChange={handleChange}
                  className="hidden"
                  id="status-rejected"
                />
                <span className={`px-4 py-2 border-2 rounded-lg cursor-pointer transition ${
                  formData.status === "Rejected"
                    ? "border-red-700 text-red-700"
                    : "border-red-500 text-red-500 hover:border-red-600 hover:text-red-600"
                }`}>
                  Rejected
                </span>
              </label>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">
                <FaExclamationCircle className="inline" /> {errors.status}
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-md border shadow-md" />
            )}
            <label className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition">
              <FaUpload />
              Upload Image
              <input type="file" name="image" accept="image/*" className="hidden" onChange={handleChange} />
            </label>
          </div>

          {/* Video Upload */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {videoPreview && (
              <video className="w-24 h-24 rounded-md border shadow-md" controls>
                <source src={videoPreview} type="video/mp4" />
              </video>
            )}
            <label className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition">
              <FaVideo />
              Upload Video
              <input type="file" name="video" accept="video/*" className="hidden" onChange={handleChange} />
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex justify-center items-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition"
            disabled={loading}
          >
            {loading ? <><FaSpinner className="animate-spin mr-2" /> Submitting...</> : "Create Innovation"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default CreateInnovation;
