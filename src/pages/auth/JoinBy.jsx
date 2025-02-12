import React, { useState } from "react";
import GuestLayout from "../../layouts/GuestLayout";

const JoinBy = () => {
  // Manage loading state for each provider
  const [loading, setLoading] = useState({
    google: false,
    email: false,
    x: false,
  });

  // Generalized handler to simulate a long asynchronous operation (5 minutes)
  const handleAction = (provider) => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    setTimeout(() => {
      alert(
        `${
          provider.charAt(0).toUpperCase() + provider.slice(1)
        } action completed.`
      );
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
      case "google":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.1 0 5.8 1.2 7.9 3.1l5.9-5.9C33.2 3.9 28.9 2 24 2 14.8 2 6.9 7.1 3.2 15.1l7.1 5.5C12.1 14.2 17.5 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.2 24.5c0-1.7-.1-3.4-.4-5H24v9.5h12.6c-.5 2.7-2 5-4.2 6.6l6.5 5C43.8 36.5 46.2 30.7 46.2 24.5z"
            />
            <path
              fill="#FBBC05"
              d="M10.3 28.1c-1.2-3.1-1.2-6.7 0-9.8l-7.1-5.5C.8 16.8 0 20.2 0 24s.8 7.2 3.2 10.2l7.1-5.5z"
            />
            <path
              fill="#34A853"
              d="M24 46c6.5 0 12-2.1 16-5.7l-7.1-5.5c-2 1.4-4.5 2.2-8 2.2-6.5 0-12-4.3-13.9-10.1l-7.1 5.5C6.9 40.9 14.8 46 24 46z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
        );
        break;
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
          <button
            onClick={() => handleAction("google")}
            disabled={loading.google}
            className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-green-500 p-2 rounded-md transition-all duration-300 focus:outline-none shadow-md min-h-[50px] hover:cursor-pointer"
          >
            {renderButtonContent("google", "Continue with Google")}
          </button>
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
