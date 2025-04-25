import React, { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";
import GoogleLoginButton from "./GoogleLoginButton";
import { useNavigate } from "react-router-dom";

const JoinBy = () => {
  // Manage loading state for each provider
  const [loading, setLoading] = useState({
    google: false,
    email: false,
    // x: false,
  });
  const navigate = useNavigate();

  // Generalized handler to simulate a long asynchronous operation (5 minutes)
  const handleAction = (provider) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    setTimeout(() => {
      navigate('/register')
      setLoading((prev) => ({ ...prev, [provider]: false }));
    }, 1000); // 300,000 ms = 5 minutes

  };

  // Render the content inside each button (icon + label or spinner)
  const renderButtonContent = (provider, label) => {
    if (loading[provider]) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          <span className="text-2xl">Loading...</span>
        </div>
      );
    }

    // Define inline SVG icons for each provider
    let icon;
    switch (provider) {

      case "email":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12H8m8 4H8m8-8H8m2-4h4a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V6a2 2 0 012-2z"
            />
          </svg>
        );
        break;
      case "x":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
        break;
      default:
        icon = null;
    }
    return (
      <div className="flex items-center justify-center space-x-4">
        {icon}
        <span className="text-2xl">{label}</span>
      </div>
    );
  };

  return (
    <GuestLayout>
      <section className="h-[90vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full flex flex-col space-y-4">
          <GoogleLoginButton role={"innovator"} />
          <button
            onClick={() => handleAction("x")}
            disabled={loading.x}
            className="flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-md transition-all duration-300 focus:outline-none shadow-md min-h-[50px] hover:cursor-pointer"
          >
            {renderButtonContent("x", "Continue with X")}
          </button>
          <button
            onClick={() => handleAction("email")}
            disabled={loading.email}
            className="flex items-center justify-center bg-gradient-to-r from-red-500 to-yellow-500 p-2 rounded-md transition-all duration-300 focus:outline-none shadow-md min-h-[50px] hover:cursor-pointer"
          >
            {renderButtonContent("email", "Continue with Email")}
          </button>
        </div>
      </section>
    </GuestLayout>
  );
};

export default JoinBy;
