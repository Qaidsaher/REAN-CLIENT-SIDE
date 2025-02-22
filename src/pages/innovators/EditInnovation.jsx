import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaUpload, FaSpinner } from "react-icons/fa";
import InputField from "../../components/UI/InputField";
import TextAreaField from "../../components/UI/TextAreaField";
import {
  getInnovationById,
  updateInnovation,
  getCategories,
} from "../../services/users/innovations";
import { motion } from "framer-motion";
import UserLayout from "../../layouts/UserLayout";

const EditInnovation = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInnovation();
    fetchCategories();
  }, []);

  const fetchInnovation = async () => {
    try {
      const data = await getInnovationById(id);
      setFormData(data);
      setImagePreview(data.image ? data.image : null);
    } catch (error) {
      console.error("❌ Error fetching innovation:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("❌ Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
      // Save the file object
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create a FormData instance and append fields
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("cost", formData.cost);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("details", formData.details);
      // If category is an object, append its _id, otherwise append the value directly
      formDataToSend.append(
        "category",
        typeof formData.category === "object" ? formData.category._id : formData.category
      );

      // Append other fields as necessary
      // If the image is a File object then append it; otherwise, if no new image was chosen, do not append.
      if (formData.image instanceof File) {
        formDataToSend.append("image", formData.image);
      }

      // Call the update service with the FormData instance
      await updateInnovation(id, formDataToSend);
      navigate("/my-ideas");
    } catch (error) {
      console.error("Error updating innovation:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!formData) {
    return (
      <p className="text-center text-gray-600">Loading innovation details...</p>
    );
  }

  return (
    <UserLayout selectedPage={"my-ideas"}>
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6 flex items-center gap-2"
        >
          <FaEdit className="text-indigo-600" /> Edit Innovation
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid Layout for Inputs (2 per row on large screens) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Innovation Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Cost ($)"
              name="cost"
              type="number"
              value={formData.cost}
              onChange={handleChange}
            />

            <div className="col-span-2">
              <TextAreaField
                label="Short Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
              <TextAreaField
                label="Details"
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </div>
            {/* Category Dropdown */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Category
              </label>
              <select
                name="category"
                value={typeof formData.category === "object" ? formData.category._id : formData.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg p-3 transition focus:ring-indigo-500"
              >
                <option value="">Select a Category</option>
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))
                ) : (
                  <option value="">Loading categories...</option>
                )}
              </select>

            </div>
            {/* Image Upload */}
            <div className="flex items-center gap-4">
              <label className="cursor-pointer flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition">
                <FaUpload />
                Upload Image
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-md border shadow-md"
                />
              )}
            </div>
          </div>

          {/* Submit Button with Loading Animation */}
          <button
            type="submit"
            className={`flex justify-center items-center bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition ${loading ? "cursor-not-allowed opacity-80" : ""
              }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Updating...
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default EditInnovation;
