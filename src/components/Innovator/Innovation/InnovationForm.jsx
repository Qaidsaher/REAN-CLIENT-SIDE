// src/components/Innovator/Innovation/InnovationForm.js
import React, { useState } from "react";

const InnovationForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name_innovation: initialData.name_innovation || "",
    description: initialData.description || "",
    cost: initialData.cost || "",
    details_innovation: initialData.details_innovation || "",
    image: initialData.image || "",
    video: initialData.video || "",
    publish_Date: initialData.publish_Date || "",
    create_by: initialData.create_by || "",
    category: initialData.category || "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name_innovation.trim())
      newErrors.name_innovation = "Innovation name is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    // Additional validations as needed.
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validations = validate();
    if (Object.keys(validations).length > 0) {
      setErrors(validations);
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="bg-white  p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 ">
        {initialData.id ? "Edit Innovation" : "Create New Innovation"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Innovation Name */}
          <div>
            <label className="block text-gray-700 mb-2">Innovation Name</label>
            <input
              type="text"
              name="name_innovation"
              value={formData.name_innovation}
              onChange={handleChange}
              placeholder="Innovation Name"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.name_innovation && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.name_innovation}
              </p>
            )}
          </div>

          {/* Cost */}
          <div>
            <label className="block text-gray-700 mb-2">Cost</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              placeholder="Cost"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description"
            rows="3"
            className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="mt-1 text-red-500 text-sm">{errors.description}</p>
          )}
        </div>
        {/* Detailed Description */}
        <div>
          <label className="block text-gray-700 mb-2">Details</label>
          <textarea
            name="details_innovation"
            value={formData.details_innovation}
            onChange={handleChange}
            placeholder="Detailed description"
            rows="4"
            className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Media URLs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Video URL</label>
            <input
              type="text"
              name="video"
              value={formData.video}
              onChange={handleChange}
              placeholder="Video URL"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {/* Publish Date & Created By */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <div>
            <label className="block text-gray-700 mb-2">Publish Date</label>
            <input
              type="date"
              name="publish_Date"
              value={formData.publish_Date}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}
          {/* <div>
            <label className="block text-gray-700 mb-2">Created By</label>
            <input
              type="text"
              name="create_by"
              value={formData.create_by}
              onChange={handleChange}
              placeholder="Creator name"
              className="w-full border border-gray-300 rounded-lg p-3 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto bg-gray-300 text-gray-800 py-2 px-6 rounded-lg hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-2 px-6 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition"
          >
            {initialData.id ? "Update Innovation" : "Create Innovation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InnovationForm;
