// src/components/Admin/NotificationList.js
import React from "react";

const NotificationList = () => {
  // Dummy notifications data
  const notifications = [
    { id: 1, name: "New Investor Registration", content: "Investor One registered." },
    { id: 2, name: "Innovation Submitted", content: "Innovation Two was submitted." },
    { id: 3, name: "Profile Update", content: "Innovator Three updated their profile." },
  ];

  return (
    <div className="bg-white shadow-md rounded p-6">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
      <ul className="space-y-4">
        {notifications.map((noti) => (
          <li key={noti.id} className="p-4 border border-gray-200 rounded hover:bg-gray-50 transition">
            <h3 className="text-xl font-semibold text-gray-800">{noti.name}</h3>
            <p className="text-gray-600">{noti.content}</p>
            <div className="mt-2">
              <button className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 mr-2">
                Approve
              </button>
              <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
