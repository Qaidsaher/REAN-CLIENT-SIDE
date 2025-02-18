import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getInnovatorById
} from "../../../services/admins/innovatorService";
import {
    getInvestorById
} from "../../../services/admins/investorService";
import AdminLayout from '../../../layouts/AdminLayout';
import { FaUserCircle, FaEnvelope, FaCity, FaBook, FaPhone, FaBirthdayCake, FaUserAlt } from "react-icons/fa";

const ShowUser = () => {
    const { userId } = useParams();
    const [user, setUser] = useState({});
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const role = queryParams.get("role");
        setUserRole(role);

        const fetchUser = async () => {
            try {
                let data;
                if (role === "innovator") {
                    data = await getInnovatorById(userId);
                } else if (role === "investor") {
                    data = await getInvestorById(userId);
                } else {
                    console.error("[ERROR] Invalid role:", role);
                    return;
                }
                setUser(data);
                console.log("[DEBUG] Fetched user data:", data);
            } catch (error) {
                console.error("[ERROR] Failed to fetch user:", error);
            }
        };

        fetchUser();
    }, [userId]);

    return (
        <AdminLayout selectedNav={userRole+'s'}>
            <div className="max-w-7xl mx-auto p-6 bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-md shadow-md">
                <div className="flex items-center mb-6 space-x-4">
                    {user.photo ? (
                        <img
                            src={user.photo}
                            alt="User Photo"
                            className="w-20 h-20 rounded-full border-4 border-white shadow-md"
                        />
                    ) : (
                        <FaUserCircle className="text-6xl text-gray-600" />
                    )}
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-800">
                            {user.firstName} {user.lastName}
                        </h2>
                        <p className="text-gray-700 text-sm">Role: {userRole}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3 mb-2">
                            <FaEnvelope className="text-indigo-600" />
                            <h3 className="font-semibold text-lg">Email</h3>
                        </div>
                        <p className="text-gray-800">{user.email || "N/A"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3 mb-2">
                            <FaCity className="text-indigo-600" />
                            <h3 className="font-semibold text-lg">City</h3>
                        </div>
                        <p className="text-gray-800">{user.city || "N/A"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3 mb-2">
                            <FaBook className="text-indigo-600" />
                            <h3 className="font-semibold text-lg">Education</h3>
                        </div>
                        <p className="text-gray-800">{user.education || "N/A"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3 mb-2">
                            <FaPhone className="text-indigo-600" />
                            <h3 className="font-semibold text-lg">Phone</h3>
                        </div>
                        <p className="text-gray-800">{user.phone || "N/A"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3 mb-2">
                            <FaBirthdayCake className="text-indigo-600" />
                            <h3 className="font-semibold text-lg">Birthday</h3>
                        </div>
                        <p className="text-gray-800">{user.birthday || "N/A"}</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition">
                        <div className="flex items-center space-x-3 mb-2">
                            <FaUserAlt className="text-indigo-600" />
                            <h3 className="font-semibold text-lg">Account X</h3>
                        </div>
                        <p className="text-gray-800">{user.accountX || "N/A"}</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h3 className="text-xl font-bold text-indigo-700 mb-3">Bio</h3>
                    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                        <p className="text-gray-800">{user.bio || "No bio available"}</p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default ShowUser;
