// src/components/Admin/ManageInnovators.js
import React from "react";

const ManageInnovators = () => {
  // Dummy list of innovators
  const innovators = [
    { id: 1, name: "Innovator One", email: "inno1@example.com" },
    { id: 2, name: "Innovator Two", email: "inno2@example.com" },
    { id: 3, name: "Innovator Three", email: "inno3@example.com" },
  ];

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Innovators</h2>
      <table className="w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {innovators.map((inno) => (
            <tr key={inno.id} className="border-b">
              <td className="p-2">{inno.id}</td>
              <td className="p-2">{inno.name}</td>
              <td className="p-2">{inno.email}</td>
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

export default ManageInnovators;
