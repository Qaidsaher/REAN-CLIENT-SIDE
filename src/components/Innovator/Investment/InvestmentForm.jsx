import React, { useState } from "react";

const InvestmentForm = ({ initialData = {}, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    innovation: initialData.innovation || "",
    amount: initialData.amount || "",
    status: initialData.status || "Pending",
    details: initialData.details || "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">
        {initialData.id ? "Edit Investment" : "Add New Investment"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Innovation Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Innovation Name
          </label>
          <input
            type="text"
            name="innovation"
            value={formData.innovation}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter innovation name"
            required
          />
        </div>

        {/* Investment Amount */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Investment Amount ($)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter amount"
            required
          />
        </div>

        {/* Investment Status */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Investment Details */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Investment Details
          </label>
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            placeholder="Enter details"
            rows="4"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {initialData.id ? "Update Investment" : "Add Investment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InvestmentForm;
