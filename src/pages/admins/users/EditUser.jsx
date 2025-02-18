import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    getInnovatorById,
    updateInnovator
} from "../../../services/admins/innovatorService";
import {
    getInvestorById,
    updateInvestor
} from "../../../services/admins/investorService";
import InputField from "../../../components/UI/InputField";
import TextAreaField from "../../../components/UI/TextAreaField";
import AdminLayout from '../../../layouts/AdminLayout';

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        email: "",
        city: "",
        education: "",
        photo: "",
        phone: "",
        birthday: "",
        accountX: "",
    });
    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState("");

    // Get the role from URL params
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const role = queryParams.get("role");
        setUserRole(role);
        console.log("[DEBUG] Role detected:", role);

        // Fetch user based on role
        const fetchUser = async () => {
            try {
                setLoading(true);
                let userData;
                if (role === "innovator") {
                    userData = await getInnovatorById(userId);
                } else if (role === "investor") {
                    userData = await getInvestorById(userId);
                } else {
                    console.error("[ERROR] Invalid role:", role);
                    return;
                }
                setFormData(userData);
                console.log("[DEBUG] Fetched user data:", userData);
            } catch (error) {
                console.error("[ERROR] Failed to fetch user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (userRole === "innovator") {
                await updateInnovator(userId, formData);
                navigate(`/admin/innovators`)
            } else if (userRole === "investor") {
                await updateInvestor(userId, formData);
                navigate(`/admin/investors`);
            } else {
                console.error("[ERROR] Invalid role:", userRole);
                return;
            }

        } catch (error) {
            console.error("[ERROR] Failed to update user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout selectedNav={userRole + 's'}>
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-indigo-700">
                    Edit {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </h2>

                {loading ? (
                    <p className="text-center text-gray-600">Loading user data...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                            <InputField
                                label="First Name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Last Name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <InputField
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Education"
                                name="education"
                                value={formData.education}
                                onChange={handleChange}
                            />
                           
                            <InputField
                                label="Phone"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Birthday"
                                name="birthday"
                                type="date"
                                value={formData.birthday}
                                onChange={handleChange}
                            />
                            <InputField
                                label="Account X"
                                name="accountX"
                                value={formData.accountX}
                                onChange={handleChange}
                            />
                            <div className="col-span-2">
                                <TextAreaField
                                    label="Bio"
                                    name="bio"
                                    value={formData.bio}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>
                        <button
                            type="submit"
                            className={`px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${loading ? "cursor-not-allowed opacity-50" : ""
                                }`}
                            disabled={loading}
                        >
                            {loading ? "Saving Changes..." : "Save Changes"}
                        </button>
                    </form>
                )}
            </div>
        </AdminLayout>
    );
};

export default EditUser;
