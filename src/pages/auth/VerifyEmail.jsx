import React, { useState, useRef } from "react";
import { verifyEmail, sendResetCode } from "@/services/authService";
import Button from "@/components/UI/Button";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import GuestLayout from "../../layouts/GuestLayout";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Handle input changes for verification code
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Auto-focus next input field
      if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  // Handle form submission for email verification
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setError("");

    const verificationCode = code.join("");
    if (verificationCode.length < 4) {
      setError("Please enter the 4-digit code.");
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        await verifyEmail(verificationCode);
        setSuccessMessage("Email verified successfully!");
        setCode(["", "", "", ""]);
        inputRefs[0].current.focus();
      } catch (error) {
        setError(
          error.response?.data?.message || "Verification failed. Try again."
        );
      } finally {
        setLoading(false);
      }
    }, 5000);
  };

  // Resend Verification Code
  const handleResend = async () => {
    setLoading(true);
    try {
      await sendResetCode();
      setSuccessMessage("Verification email resent successfully.");
    } catch (error) {
      setError("Failed to resend verification email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GuestLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 w-full px-6">
        <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
            Verify Your Email
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Enter the 4-digit code we sent to your email.
          </p>

          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          {successMessage && (
            <p className="text-green-600 text-center mb-4">{successMessage}</p>
          )}

          {/* Verification Code Inputs */}
          <form
            onSubmit={handleSubmit}
            className="flex justify-center space-x-2 mb-4"
          >
            {code.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900 font-bold"
              />
            ))}
          </form>

          {/* Submit Button */}
          <div className="flex justify-center py-4">
            <Button
              type="submit"
              text={loading ? <LoadingSpinner color="white" /> : "Verify Email"}
              variant="indigo"
              className="w-full"
              disabled={loading}
              onClick={handleSubmit}
            />
          </div>

          {/* Resend Verification Code */}
          <div className="text-center mt-4">
            <button
              onClick={handleResend}
              className="text-indigo-600 hover:underline"
              disabled={loading}
            >
              Resend Verification Email
            </button>
          </div>

          {/* Back to Login */}
          <div className="text-center mt-2">
            <Link to="/login" className="text-gray-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </GuestLayout>
  );
};

export default VerifyEmail;
