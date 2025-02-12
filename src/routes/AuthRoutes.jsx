import React from "react";
import { Routes, Route } from "react-router-dom";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
// import VerifyCodePage from "../pages/auth/VerifyCodePage";
// import GoogleSignInPage from "../pages/auth/GoogleSignInPage";
// import TwitterSignInPage from "../pages/auth/TwitterSignInPage";
import UnauthorizedPage from "../pages/UnauthorizedPage";
import GuestLayout from "../layouts/GuestLayout";
import Login from "../pages/auth/Login";
import LandingPage from "../pages/LandingPage";
import ChangePassword from "../pages/auth/ChangePassword";

const AuthRoutes = () => {
  return (
    // <GuestLayout>
      <Routes>
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/change-password" element={<ChangePassword />} />
        {/* <Route path="/verify-code" element={<VerifyCodePage />} />
       <Route path="/google-signin" element={<GoogleSignInPage />} />
       <Route path="/twitter-signin" element={<TwitterSignInPage />} /> */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    // </GuestLayout>
  );
};

export default AuthRoutes;
