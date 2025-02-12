// src/components/Innovator/Innovation/InnovationDetail.jsx
import React from "react";
import { Link } from "react-router-dom";


const InnovationDetail = ({ innovation }) => {
  if (!innovation) return <p className="text-center py-16">Innovation not found.</p>;

  const statusColors = {
    approved: "bg-green-100 text-green-800 border-green-300",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
    rejected: "bg-red-100 text-red-800 border-red-300",
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto py-4 ">
        <div className=" p-8 space-y-8">
          {/* Header Section */}
          <Link to="/innovations" className="text-indigo-600 hover:underline mb-8 inline-block">
          &larr; Back to Innovations
        </Link>
          <div className="flex flex-col md:flex-row items-center gap-8 border-b pb-8">
            <img
              src={innovation.image}
              alt={innovation.name_innovation}
              className="w-full md:w-1/2 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900">{innovation.name_innovation}</h1>
              <div className={`inline-block mt-4 px-4 py-2 rounded-full border ${statusColors[innovation.status]}`}>
                {innovation.status.toUpperCase()}
              </div>
              <p className="text-xl text-gray-600 mt-4">{innovation.description}</p>
              <p className="mt-4 text-gray-700">
                <strong>Cost:</strong> {innovation.cost}
              </p>
            </div>
          </div>

          {/* Details Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Details</h2>
            <p className="text-gray-700 leading-relaxed">{innovation.details_innovation}</p>
          </div>

          {/* Video Section */}
          {innovation.video && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Video</h2>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={innovation.video}
                  title={innovation.name_innovation}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Publication Info */}
          <div className="text-gray-600">
            <p>
              <strong>Published:</strong> {innovation.publish_Date}
            </p>
            <p className="mt-2">
              <strong>Created by:</strong> {innovation.create_by}
            </p>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default InnovationDetail;
