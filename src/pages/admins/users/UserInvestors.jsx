import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEdit, FaPlus, FaTrash, FaCity, FaEnvelope, FaPhone, FaUser, FaUserGraduate, FaCalendarAlt } from 'react-icons/fa';
import AdminLayout from '../../../layouts/AdminLayout';
import { getInvestors, deleteInvestor } from "../../../services/admins/investorService";

const UserInvestors = () => {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getInvestors();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch investors", error);
            }
        };
        fetchUsers();
    }, []);

    const openDeleteModal = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedUser(null);
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        if (selectedUser) {
            try {
                await deleteInvestor(selectedUser._id);
                setUsers(users.filter(user => user._id !== selectedUser._id));
                closeDeleteModal();
            } catch (error) {
                console.error("Failed to delete investor", error);
            }
        }
    };

    return (
        <AdminLayout selectedNav="investors">
            <div className=" p-4 bg-gradient-to-br from-teal-100 to-teal-300 rounded-md shadow-md">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                    <h2 className="text-4xl font-extrabold text-teal-800 mb-4 md:mb-0">
                        Investors Management
                    </h2>
                    <Link
                        to={`/admin/users/create?role=investor`}
                        className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-md shadow-md hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                    >
                        <FaPlus className="mr-2" /> Add New Investor
                    </Link>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full table-auto border border-gray-300 text-sm bg-white">
                        <thead className="bg-teal-700 text-white text-left">
                            <tr>
                                <th className="p-2 px-3 text-center">ID</th>
                                <th className="p-2">Photo</th>
                                <th className="p-2">Name</th>
                                <th className="p-2">Email</th>
                                <th className="p-2">Phone</th>
                                <th className="p-2">City</th>
                                <th className="p-2">Education</th>
                                <th className="p-2">Registered On</th>
                                <th className="p-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-teal-50 transition">
                                    <td className="p-3 text-center text-xl">
                                        {index + 1}
                                    </td>
                                    {/* Photo */}
                                    <td className="p-3">
                                        {user.photo ? (
                                            <img
                                                src={user.photo}
                                                alt="User Photo"
                                                className="w-8 h-8 rounded-full border border-gray-400 shadow-sm object-cover"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600">
                                                <FaUser className="text-xl" />
                                            </div>
                                        )}
                                    </td>

                                    {/* Name */}
                                    <td className="p-3 font-semibold text-teal-900">{user.firstName} {user.lastName}</td>

                                    {/* Email */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <FaEnvelope className="text-teal-500" />
                                            {user.email}
                                        </div>
                                    </td>

                                    {/* Phone */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <FaPhone className="text-green-500" />
                                            {user.phone || "N/A"}
                                        </div>
                                    </td>

                                    {/* City */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <FaCity className="text-blue-500" />
                                            {user.city}
                                        </div>
                                    </td>

                                    {/* Education */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <FaUserGraduate className="text-yellow-500" />
                                            {user.education || "N/A"}
                                        </div>
                                    </td>

                                    {/* Registration Date */}
                                    <td className="p-3">
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-purple-500" />
                                            {user.publishDate ? new Date(user.publishDate).toLocaleDateString() : "N/A"}
                                        </div>
                                    </td>

                                    {/* Actions */}
                                    <td className="p-3 flex items-center justify-center gap-4 text-lg">
                                        <Link
                                            to={`/admin/users/${user._id}?role=investor`}
                                            className="text-blue-600 hover:text-blue-800 transition-all duration-300 transform hover:scale-110"
                                            title="View Investor"
                                        >
                                            <FaEye />
                                        </Link>

                                        <Link
                                            to={`/admin/users/edit/${user._id}?role=investor`}
                                            className="text-green-600 hover:text-green-800 transition-all duration-300 transform hover:scale-110"
                                            title="Edit Investor"
                                        >
                                            <FaEdit />
                                        </Link>

                                        <button
                                            onClick={() => openDeleteModal(user)}
                                            className="text-red-600 hover:text-red-800 transition-all duration-300 transform hover:scale-110"
                                            title="Delete Investor"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center animate__animated animate__fadeInDown">
                        <h3 className="text-2xl font-bold text-red-600 mb-6">
                            Confirm Deletion
                        </h3>
                        <p className="text-lg text-gray-800 mb-4">
                            Are you sure you want to delete <strong>{selectedUser.firstName} {selectedUser.lastName}</strong>?
                        </p>
                        <div className="flex justify-center gap-4 mt-6">
                            <button
                                className="px-5 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105"
                                onClick={handleDelete}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="px-5 py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
};

export default UserInvestors;
