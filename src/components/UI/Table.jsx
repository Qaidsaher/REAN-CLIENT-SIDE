import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const Table = ({ data, fields, onCreate, onEdit, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // ✅ Enhanced limitString with error handling
  const limitString = (str) => {
    try {
      // Check if the input is a valid string
      if (typeof str !== "string") {
        // throw new Error("Invalid input: expected a string");
        return str;
      }

      const length = 5;
      const words = str.split(" ");

      // Return the limited string or full string if it's within the limit
      return words.length > length
        ? `${words.slice(0, length).join(" ")}...`
        : str;

    } catch (error) {
      console.error("Error in limitString:", error.message);
      return ""; // Return an empty string or a default value in case of an error
    }
  };

  const tableScrollStyle = {
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "thin",
    scrollbarColor: "#888 #f1f1f1",
    scrollBehavior: "smooth",
    maxWidth: "100%",
  };

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
  const checkerType = (field) => {
    if (field === "phone" || field === "email") {
      return field;
    } else if (field === "birthday") {
      return "date";
    }
    else {
      return "text";
    }
  }
  return (
    <div className="bg-white p-6 rounded-md shadow-md w-full">
      <div className="flex justify-between">


        <InputField
          label=""
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search..."
        />
        <button
          className="bg-indigo-600 text-white px-4 py-1 h-10 rounded-md shadow-md hover:bg-indigo-700 transition duration-200 flex items-center space-x-2"
          onClick={handleCreate}
        >
          <span className="text-lg text-white">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

          </span>
          <span>Create New</span>
        </button>
      </div>

      {loading && (
        <div className="animate-pulse text-gray-500">Searching...</div>
      )}
      <div className="w-full whitespace-nowrap">
        <table className=" border-collapse rounded-md w-full shadow-md p-2">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th className="py-2 uppercase text-sm">ID</th>
              {fields.map((field) => (
                <th key={field} className="p-1 uppercase text-sm text-nowrap">
                  {field}
                </th>
              ))}
              <th className="p-1 uppercase text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((item) =>
                (item.name || "")
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              )
              .map((item, index) => (
                <tr
                  key={index}
                  className="text-center transition duration-200 hover:bg-indigo-50 even:bg-gray-100 "
                >
                  <td className="p-3 text-gray-700">{index + 1}</td>
                  {fields.map((field) => (
                    <td key={field} className="p-1 text-gray-700 text-nowrap">
                      {limitString(item[field] ?? "")}
                    </td>
                  ))}
                  <td className="p-2 flex justify-center space-x-4">
                    {/* Edit Button */}
                    <button
                      className="px-3 py-0.5 rounded-sm shadow border-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 ease-in-out"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className="px-3 py-0.5 rounded-sm shadow border-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out"
                      onClick={() => setDeleteConfirm(item._id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
          </tbody>
        </table>
      </div>

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
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl transform transition-all scale-100 opacity-100 shadow-xl">
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
              className="grid grid-cols-1 md:grid-cols-2 gap-2"
            >
              {fields.map((field) => {
                {
                  if (field == "bio") {
                    return <div className="col-span-2">
                      <TextAreaField
                        type={checkerType(field)}
                        key={field}
                        label={field}
                        value={formData[field] || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, [field]: e.target.value })
                        }
                      />
                    </div>
                  } else {
                    return <InputField
                      type={checkerType(field)}
                      key={field}
                      label={field}
                      value={formData[field] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field]: e.target.value })
                      }
                    />
                  }
                }

              })}
              <div className="col-span-1 md:col-span-2 flex justify-end gap-4 mt-2">
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
