import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import InputField from "./InputField";

const Table = ({ data, fields, onCreate, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleCreate = () => {
    setFormData({});
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEdit = (item) => {
    setFormData(item);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onEdit(formData);
    } else {
      onCreate(formData);
    }
    setModalOpen(false);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button
        className="bg-indigo-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition duration-200 flex items-center space-x-2"
        onClick={handleCreate}
      >
        <span className="text-lg">➕</span>
        <span>Create New</span>
      </button>

      <InputField
        label="Search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search..."
      />
      {loading && (
        <div className="animate-pulse text-gray-500">Searching...</div>
      )}

      <table className="w-full border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-indigo-600 text-white">
            <th className="p-3 uppercase text-sm">ID</th>
            {fields.map((field) => (
              <th key={field} className="p-3 uppercase text-sm">
                {field}
              </th>
            ))}
            <th className="p-3 uppercase text-sm">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data
            .filter((item) =>
              (item.name || "").toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((item, index) => (
              <tr
                key={index}
                className="text-center transition duration-200 hover:bg-indigo-50 even:bg-gray-100"
              >
                <td className="p-3 text-gray-700">{index + 1}</td>
                {fields.map((field) => (
                  <td key={field} className="p-3 text-gray-700">
                    {item[field]}
                  </td>
                ))}
                <td className="p-2 flex justify-center space-x-4">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded-md shadow hover:bg-blue-700 transition duration-200"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white px-2 py-0 rounded-md shadow hover:bg-red-700 transition duration-200"
                    onClick={() => setDeleteConfirm(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* ✅ Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm transform transition-all scale-100 opacity-100">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-indigo-700">
                Confirm Deletion
              </h2>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
              >
                ✖
              </button>
            </div>
            <p className="text-gray-600 mt-2">
              Are you sure you want to delete this entry?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                onClick={() => setDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                onClick={() => {
                  onDelete(deleteConfirm);
                  setDeleteConfirm(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl transform transition-all scale-100 opacity-100 shadow-xl">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-lg font-bold text-indigo-700">
                {isEditing ? "Edit Entry" : "Create New"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition duration-200"
              >
                ✖
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {fields.map((field) => (
                <InputField
                  key={field}
                  label={field}
                  value={formData[field] || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              ))}
              <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-200"
                >
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
