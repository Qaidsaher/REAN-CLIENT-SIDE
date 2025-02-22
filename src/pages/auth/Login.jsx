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
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  const { login, token, role, googleLogin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "innovator", // Default role as 'innovator'
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
    if (!formData.email.trim()) newErrors.email = t("emailRequired");
    if (!formData.password.trim()) newErrors.password = t("passwordRequired");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setErrors({});

    try {
      // Attempt login and check returned response for errors
      const response = await login(
        formData.email,
        formData.password,
        formData.role
      );

      if (!response.success) {
        setErrors({ general: response.message });
        setLoading(false);
        return;
      }

      if (rememberMe) {
        localStorage.setItem("rememberMe", JSON.stringify(formData));
      } else {
        localStorage.removeItem("rememberMe");
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setErrors({
        general: error.response?.data?.message || t("loginFailed"),
      });
    } finally {
      setLoading(false);
    }
  };

  // Role Button Colors
  const roleColors = {
    innovator: "bg-blue-600 text-white border-blue-600",
    investor: "bg-green-600 text-white border-green-600",
    admin: "bg-red-600 text-white border-red-600",
  };

  // Handle Google Sign-In
  const handleGoogleSignIn = async (token) => {
    try {
      await googleLogin(token, formData.role);
      // You may add further actions upon successful Google login
    } catch (error) {
      console.error("Google Sign-in Error:", error.response?.data || error);
      setErrors({ general: t("googleLoginFailed") });
    }
  };

  return (
    <GuestLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full">
        <Card title={t("welcomeBack")} description={t("loginPrompt")}>
          {errors.general && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-md text-center mb-3">
              {errors.general}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label={t("email")}
              type="email"
              name="email"
              placeholder={t("emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              label={t("password")}
              type="password"
              name="password"
              placeholder={t("passwordPlaceholder")}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
            <div>
              <label className="text-gray-700 font-semibold">
                {t("selectRole")}
              </label>
              <div className="flex space-x-4 mt-2">
                {["innovator", "investor", "admin"].map((option) => (
                  <label
                    key={option}
                    className={`cursor-pointer px-2 py-0 rounded-sm border ${
                      formData.role === option
                        ? roleColors[option]
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
                    {t(`role${option.charAt(0).toUpperCase() + option.slice(1)}`)}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMe}
                className="mx-2 w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="rememberMe" className="text-gray-600 cursor-pointer">
                {t("rememberMe")}
              </label>
            </div>
            <Button
              type="submit"
              text={loading ? <LoadingSpinner color="white" /> : t("loginButton")}
              variant="indigo"
              className="w-full"
              disabled={loading}
            />
            {loading && (
              <p className="text-center text-gray-500">{t("loggingIn")}</p>
            )}
          </form>
          <div className="my-2">
            <GoogleLoginButton onSuccess={handleGoogleSignIn} role={formData.role} /> 
          </div>
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-indigo-600 hover:underline">
              {t("forgotPassword")}
            </Link>
          </div>
          <div className="text-center mt-2">
            <span className="text-gray-600">{t("noAccount")} </span>
            <Link to="/register" className="text-indigo-600 hover:underline">
              {t("signUp")}
            </Link>
          </div>
        </Card>
      </div>
    </GuestLayout>
  );
};

export default Login;
