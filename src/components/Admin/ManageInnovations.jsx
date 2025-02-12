// src/components/Admin/ManageInnovations.js
import React from "react";

const ManageInnovations = () => {
  // Dummy list of innovations
  const innovations = [
    { id: 1, name: "Innovation One", createdBy: "Innovator One" },
    { id: 2, name: "Innovation Two", createdBy: "Innovator Two" },
    { id: 3, name: "Innovation Three", createdBy: "Innovator Three" },
  ];

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Innovations</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Innovation Name</th>
            <th className="p-2 text-left">Created By</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {innovations.map((inn) => (
            <tr key={inn.id} className="border-b">
              <td className="p-2">{inn.id}</td>
              <td className="p-2">{inn.name}</td>
              <td className="p-2">{inn.createdBy}</td>
              <td className="p-2">
                <button className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageInnovations;
