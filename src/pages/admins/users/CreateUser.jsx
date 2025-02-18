import React, { useState, useEffect } from "react";
import { FaPlusCircle, FaSpinner } from "react-icons/fa";
import TextAreaField from "../../../components/UI/TextAreaField";
import InputField from "../../../components/UI/InputField";
import { createInnovator } from "../../../services/admins/innovatorService";
import { createInvestor } from "../../../services/admins/investorService";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import AdminLayout from "../../../layouts/AdminLayout";

const CreateUser = () => {
    const navigate = useNavigate();

    // Initialize form data
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        bio: "",
        email: "",
        city: "",
        education: "",
        password: "",
        photo: "",
        phone: "",
        birthday: "",
        accountX: "",
    });

    const [loading, setLoading] = useState(false);
    const [userRole, setUserRole] = useState("");

    // Get the role from URL parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const role = queryParams.get("role");
        setUserRole(role);
        console.log("[DEBUG] User role from params:", role);
    }, []);

    // Handle Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (userRole === "innovator") {
                console.log("[DEBUG] Creating Innovator:", formData);
                await createInnovator(formData);
                navigate("/admin/innovators");
            } else if (userRole === "investor") {
                console.log("[DEBUG] Creating Investor:", formData);
                await createInvestor(formData);
                navigate("/admin/investors");
            } else {
                console.error("[ERROR] Invalid role provided:", userRole);
                return;
            }
        } catch (error) {
            console.error("[ERROR] Error creating user:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AdminLayout selectedNav={userRole+'s'}>
            <div className="max-w-7xl mx-auto p-8 bg-white rounded-lg shadow-md">
                <motion.h2
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold mb-6 flex items-center gap-2"
                >
                    <FaPlusCircle className="text-indigo-600" /> Create {userRole === "innovator" ? "Innovator" : "Investor"}
                </motion.h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputField
                            label="First Name"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />

                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <InputField
                            label="City"
                            name="city"
                            type="text"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Education"
                            name="education"
                            type="text"
                            value={formData.education}
                            onChange={handleChange}
                        />
                        <InputField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                       
                        <InputField
                            label="Phone"
                            name="phone"
                            type="text"
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
                            type="text"
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
                        className={`flex justify-center items-center px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ${loading ? "cursor-not-allowed opacity-80" : ""}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <FaSpinner className="animate-spin mr-2" /> Submitting...
                            </>
                        ) : (
                            `Create ${userRole.charAt(0).toUpperCase() + userRole.slice(1)}`
                        )}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default CreateUser;
