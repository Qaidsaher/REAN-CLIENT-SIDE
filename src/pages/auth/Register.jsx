import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

const Register = () => {
  const { register, token, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      if (role === "innovator") {
        navigate("/dashboard-innovator");
      } else if (role === "investor") {
        navigate("/dashboard-investor");
      }
    }
  }, [token, role, navigate]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    birthday: "",
    city: "",
    education: "",
    role: "innovator",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Clear errors on input change
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // const validate = () => {
  //   let newErrors = {};
  //   // Regex for a basic email validation check
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  //   if (!formData.firstName.trim())
  //     newErrors.firstName = "First name is required";
  //   if (!formData.lastName.trim())
  //     newErrors.lastName = "Last name is required";
  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required";
  //   } else if (!emailRegex.test(formData.email)) {
  //     newErrors.email = "Please enter a valid email address";
  //   }
  //   if (!formData.phone.trim())
  //     newErrors.phone = "Phone number is required";
  //   if (!formData.birthday)
  //     newErrors.birthday = "Birthday is required";
  //   if (!formData.city.trim())
  //     newErrors.city = "City is required";
  //   if (!formData.education.trim())
  //     newErrors.education = "Education is required";
  //   if (!formData.password.trim())
  //     newErrors.password = "Password is required";
  //   if (formData.password !== formData.confirmPassword)
  //     newErrors.confirmPassword = "Passwords do not match";
  //   if (!formData.termsAccepted)
  //     newErrors.termsAccepted = "You must accept the Terms & Conditions";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const validate = () => {
    let newErrors = {};
    // Regex for a basic email validation check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim())
      newErrors.phone = "Phone number is required";
    if (!formData.birthday)
      newErrors.birthday = "Birthday is required";
    if (!formData.city.trim())
      newErrors.city = "City is required";
    if (!formData.education.trim())
      newErrors.education = "Education is required";

    // Password validations
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else {
      const lowercaseRegex = /(?=.*[a-z])/;
      const uppercaseRegex = /(?=.*[A-Z])/;
      const numberRegex = /(?=.*\d)/;

      if (!lowercaseRegex.test(formData.password)) {
        newErrors.password = "Password must contain at least one lowercase letter";
      } else if (!uppercaseRegex.test(formData.password)) {
        newErrors.password = "Password must contain at least one uppercase letter";
      } else if (!numberRegex.test(formData.password)) {
        newErrors.password = "Password must contain at least one number";
      }
    }

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the Terms & Conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const { termsAccepted, confirmPassword, ...submitData } = formData;
      const response = await register(submitData);
      // Check if the registration was unsuccessful
      if (!response.success) {
        setErrors({ general: response.message });
        setLoading(false);
        return;
      }
      console.log("Registered Successfully:", response);


    } catch (error) {
      setErrors({
        general: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full p-4">
        <div className="max-w-4xl w-full bg-white shadow-md rounded-md p-8 xl:p-10">
          <h2 className="text-3xl font-bold text-indigo-700 mb-4">
            Create an Account
          </h2>
          <p className="text-gray-600 mb-4 ">
            Fill in your details correctly to sign up.
          </p>

          {errors.general && (
            <p className="text-red-600 text-center">{errors.general}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-x-2">
              <InputField
                label="First Name"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              <InputField
                label="Last Name"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />
              <InputField
                label="Phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
              />
              <InputField
                label="Birthday"
                name="birthday"
                type="date"
                value={formData.birthday}
                onChange={handleChange}
                error={errors.birthday}
              />
              <InputField
                label="City"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              <InputField
                label="Education"
                name="education"
                placeholder="Enter your education"
                value={formData.education}
                onChange={handleChange}
                error={errors.education}
              />
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
              />
              <div>
                <label className="text-gray-700">Select Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="innovator">Innovator</option>
                  <option value="investor">Investor</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <span className="text-gray-600">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Terms & Conditions
                </a>
              </span>
              {errors.termsAccepted && (
                <p className="text-red-600 ml-2 text-sm">{errors.termsAccepted}</p>
              )}
            </div>

            <Button
              type="submit"
              text={loading ? <LoadingSpinner color="white" /> : "Register"}
              variant="indigo"
              className="w-full"
              disabled={loading || !formData.termsAccepted}
            />
          </form>

          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Register;
