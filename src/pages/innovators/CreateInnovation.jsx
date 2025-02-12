import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaUpload, FaVideo, FaSpinner } from "react-icons/fa";
import TextAreaField from "../../components/UI/TextAreaField";
import InputField from "../../components/UI/InputField";
import { createInnovation, getCategories } from "../../services/innovators";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import UserLayout from "../../layouts/UserLayout";

const CreateInnovation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    details: "",
    category: "",
    image: null,
    video: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(async () => {
      try {
        await createInnovation(formData);
        // alert("🎉 Innovation created successfully!");
        navigate("/my-ideas"); // Redirect to innovations page
      } catch (error) {
        // alert("❌ Error creating innovation. Please try again.");
        console.error("Error creating innovation:", error);
      } finally {
        setLoading(false);
      }
    }, 4000); // Wait for 4 seconds before displaying the alert
  };

  return (
    <UserLayout selectedPage={"my-ideas"}>
      <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md ">
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
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:ring-indigo-500"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-md border shadow-md"
              />
            )}
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
              <input
                type="file"
                name="video"
                accept="video/*"
                className="hidden"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Submit Button with Loading Animation */}
          <button
            type="submit"
            className={`flex justify-center items-center px-4 bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition ${
              loading ? "cursor-not-allowed opacity-80" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin mr-2" /> Submitting...
              </>
            ) : (
              "Create Innovation"
            )}
          </button>
        </form>
      </div>
    </UserLayout>
  );
};

export default CreateInnovation;
