// src/components/Innovator/Innovation/InnovationList.js
import React from "react";

// Helper: Return a color scheme based on innovation status.
const getStatusColors = (status) => {
  switch (status) {
    case "approved":
      return { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" };
    case "pending":
      return { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" };
    case "rejected":
      return { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300" };
  }
};

const InnovationList = ({
  innovations,
  onDelete,
  onEdit,
  onViewDetail,
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
}) => {
  const filteredInnovations = innovations.filter((inn) => {
    const matchesSearch = inn.name_innovation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter ? inn.category === filter : true;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className=" p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">My Innovations</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search innovations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-md p-3 px-6 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="">All Categories</option>
            <option value="tech">Tech</option>
            <option value="health">Health</option>
            <option value="edu">Education</option>
          </select>
        </div>
      </div>
      {/* If searching and no items match, show shimmer placeholders */}
      {filteredInnovations.length === 0 && searchTerm.trim() !== "" ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse flex space-x-4 p-4 border border-gray-200 rounded-sm">
              <div className="rounded bg-gray-300 h-6 w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInnovations.map((inn) => {
            const colors = getStatusColors(inn.status);
            return (
              <div
                key={inn.id}
                onClick={() => onViewDetail(inn)}
                className={`cursor-pointer p-4 border hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between items-start rounded-sm ${colors.border}`}
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {inn.name_innovation}
                  </h3>
                  <p className="text-gray-600 mt-1">{inn.description}</p>
                  <span className="text-gray-500 text-sm block mt-2">
                    Cost: {inn.cost}
                  </span>
                  <div
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${colors.bg} ${colors.text}`}
                  >
                    {inn.status.toUpperCase()}
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(inn);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(inn.id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InnovationList;
