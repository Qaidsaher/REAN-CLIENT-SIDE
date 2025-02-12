// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import useAuth from "@/hooks/useAuth";
// import InputField from "@/components/UI/InputField";
// import Button from "@/components/UI/Button";
// import Card from "@/components/UI/Card";
// import { Link } from "react-router-dom";
// import LoadingSpinner from "@/components/UI/LoadingSpinner";
// import GuestLayout from "../../layouts/GuestLayout";

// const Login = () => {
//   const { login, token, role } = useAuth();
//   const navigate = useNavigate(); // ✅ Hook to handle navigation
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     role: "innovator",
//   }); // ✅ Added role
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);

//   useEffect(() => {
//     if (token) {
//       // Redirect based on role
//       if (role === "innovator") {
//         navigate("/dashboard-innovator");
//       } else if (role === "investor") {
//         navigate("/dashboard-investor");
//       }
//     }
//   }, [token, role, navigate]);

//   // Handle Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//     setErrors((prevErrors) => ({ ...prevErrors, [name]: "" })); // Clear errors
//   };

//   // Handle Remember Me
//   const handleRememberMe = () => {
//     setRememberMe(!rememberMe);
//   };

//   // Form Validation
//   const validate = () => {
//     let newErrors = {};
//     if (!formData.email.trim()) newErrors.email = "Email is required";
//     if (!formData.password.trim()) newErrors.password = "Password is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle Form Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);

//     setTimeout(async () => {
//       try {
//         await login(formData.email, formData.password, formData.role); // ✅ Include role in login request
//         if (rememberMe) {
//           localStorage.setItem("rememberMe", JSON.stringify(formData)); // ✅ Store login details in localStorage
//         } else {
//           localStorage.removeItem("rememberMe");
//         }
//       } catch (error) {
//         setErrors({ general: error.response?.data?.message || "Login failed" });
//       } finally {
//         setLoading(false);
//       }
//     }, 3000); // ✅ Simulate delay for 3 seconds
//   };

//   return (
//     <GuestLayout>
//       <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
//         <Card
//           title="Welcome Back!"
//           description="Please enter your credentials to log in."
//         >
//           {errors.general && (
//             <p className="text-red-600 text-center">{errors.general}</p>
//           )}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <InputField
//               label="Email"
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               error={errors.email}
//             />
//             <InputField
//               label="Password"
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={handleChange}
//               error={errors.password}
//             />
//             {/* ✅ Role Selection */}
//             <div>
//               <label className="text-gray-700">Select Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 className="w-full p-2 border border-gray-300 rounded-lg"
//               >
//                 <option value="innovator">Innovator</option>
//                 <option value="investor">Investor</option>
//               </select>
//             </div>
//             {/* ✅ Remember Me Checkbox */}
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="rememberMe"
//                 checked={rememberMe}
//                 onChange={handleRememberMe}
//                 className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
//               />
//               <label
//                 htmlFor="rememberMe"
//                 className="text-gray-600 cursor-pointer"
//               >
//                 Remember Me
//               </label>
//             </div>
//             {/* ✅ Submit Button with Spinner */}
//             <Button
//               type="submit"
//               text={loading ? <LoadingSpinner color="white" /> : "Login"}
//               variant="indigo"
//               className="w-full"
//               disabled={loading}
//             />
//           </form>
//           <div className="text-center mt-4">
//             <Link
//               to="/forgot-password"
//               className="text-indigo-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>
//           <div className="text-center mt-2">
//             <span className="text-gray-600">Don't have an account? </span>
//             <Link to="/register" className="text-indigo-600 hover:underline">
//               Sign up here
//             </Link>
//           </div>
//         </Card>
//       </div>
//     </GuestLayout>
//   );
// };

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import InputField from "@/components/UI/InputField";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import { Link } from "react-router-dom";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import GuestLayout from "../../layouts/GuestLayout";
import GoogleLoginButton from "./GoogleLoginButton";
import axios from "axios";
const Login = () => {
  const { login, token, role } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "innovator",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (token) {
      if (role === "admin") {
        navigate("/admin/index");
      } else if (role === "innovator") {
        navigate("/dashboard-innovator");
      } else if (role === "investor") {
        navigate("/dashboard-investor");
      }
    }
  }, [token, role, navigate]);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  // Handle Remember Me
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  // Form Validation
  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit (Waits 5 seconds before logging in)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({}); // Clear previous errors

    setTimeout(async () => {
      try {
        await login(formData.email, formData.password, formData.role);
        if (rememberMe) {
          localStorage.setItem("rememberMe", JSON.stringify(formData));
        } else {
          localStorage.removeItem("rememberMe");
        }
      } catch (error) {
        console.error("❌ Login Error:", error);
        setErrors({
          general:
            error.response?.data?.message ||
            "Invalid credentials. Please check your email, password, and role.",
        });
      } finally {
        setLoading(false);
      }
    }, 5000); // ✅ Wait 5 seconds before sending login request
  };

  // ✅ Role Button Colors
  const roleColors = {
    innovator: "bg-blue-600 text-white border-blue-600",
    investor: "bg-green-600 text-white border-green-600",
    admin: "bg-red-600 text-white border-red-600",
  };
  // const handleGoogleSignIn = async (token) => {
  //   try {
  //     const response = await axios.post("http://localhost:5000/auth/google", {
  //       token,
  //     });
  //     alert(JSON.stringify(response.data.user))
  //     localStorage.setItem("user", JSON.stringify(response.data.user));
  //     // navigate("/dashboard");
  //   } catch (error) {
  //     console.error("Google Sign-in Error:", error.response?.data || error);
  //   }
  // };
  return (
    <GuestLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
        <Card
          title="Welcome Back!"
          description="Please enter your credentials to log in."
        >
          {/* ✅ Show error message if login fails */}
          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center mb-3">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label="Password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            {/* ✅ Role Selection with Colorful Buttons */}
            <div>
              <label className="text-gray-700 font-semibold">Select Role</label>
              <div className="flex space-x-4 mt-2">
                {["innovator", "investor", "admin"].map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer px-2 py-0 rounded-sm border ${
                      formData.role === option
                        ? roleColors[option] // Apply color based on selected role
                        : "bg-white text-gray-600 border-gray-300"
                    } transition-all duration-300`}
                  >
                    <input
                      type="radio"
                      name="role"
                      value={option}
                      checked={formData.role === option}
                      onChange={handleChange}
                      className="hidden"
                    />
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </label>
                ))}
              </div>
            </div>
            {/* ✅ Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMe}
                className="mr-2 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label
                htmlFor="rememberMe"
                className="text-gray-600 cursor-pointer"
              >
                Remember Me
              </label>
            </div>
            {/* ✅ Submit Button with Spinner */}
            <Button
              type="submit"
              text={loading ? <LoadingSpinner color="white" /> : "Login"}
              variant="indigo"
              className="w-full"
              disabled={loading}
            />
            {/* ✅ Show countdown message when waiting */}
            {loading && (
              <p className="text-center text-gray-500">
                Logging in... Please wait.
              </p>
            )}
          </form>
          {/* <GoogleLoginButton onSuccess={handleGoogleSignIn} /> */}
          <div className="text-center mt-4">
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-indigo-600 hover:underline">
              Sign up here
            </Link>
          </div>
        </Card>
      </div>
    </GuestLayout>
  );
};

export default Login;
