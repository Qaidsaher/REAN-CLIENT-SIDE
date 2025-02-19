import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import UnauthorizedPage from "../pages/UnauthorizedPage";
import { AuthProvider } from "../contexts/AuthContext";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgetPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";
// import VerifyCodePage from "../pages/auth/VerifyCodePage";
// import GoogleSignInPage from "../pages/auth/GoogleSignInPage";
// import TwitterSignInPage from "../pages/auth/TwitterSignInPage";
import Login from "../pages/auth/Login";
import ChangePassword from "../pages/auth/ChangePassword";
import Innovations from "../pages/innovators/Innovations";
import CreateInnovation from "../pages/innovators/CreateInnovation";
import EditInnovation from "../pages/innovators/EditInnovation";
import Chats from "../pages/Chats";
import Profile from "../pages/Profile";
import InnovationDetail from "../pages/InnovationDetail";
import InnovationsList from "../pages/InnovationsList";
import InnovatorsList from "../pages/InnovatorsList"; // Innovators Listing Page
import InnovatorProfile from "../pages/InnovatorProfile"; // Innovator Detail Page
import InvestorsList from "../pages/InvestorsList";
import InvestorProfile from "../pages/InvestorProfile";
import InvestmentsList from "../pages/InvestmentsList";
import InvestmentDetail from "../pages/InvestmentDetail";
import ShowInnovation from "../pages/innovators/ShowInnovation";
import InvestorDashboard from "../pages/InvestorDashboard";
import InnovatorDashboard from "../pages/InnovatorDashboard";
import Help from "../pages/Help";
import InvestorGuide from "../pages/InvestorGuide";
import InnovationGuide from "../pages/InnovationGuide";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsAndConditions from "../pages/TermsAndConditions";
import CommunityGuidelines from "../pages/CommunityGuidelines";
import SecurityCompliance from "../pages/SecurityCompliance";
import JoinBy from "../pages/auth/JoinBy";
import Commitment from "../pages/Commitment";
import Index from "../pages/admins/Index";
import Category from "../pages/admins/Category";
import AdminRoutes from "./AdminRoutes";
import MyActivity from "../pages/MyActivity";
import AboutUs from "../pages/AboutUs";
const UserRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/change-password" element={<ChangePassword />} />
      <Route path="/join-by" element={<JoinBy />} />
      <Route path="/help" element={<Help />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/investor-guide" element={<InvestorGuide />} />
      <Route path="/innovation-guide" element={<InnovationGuide />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsAndConditions />} />
      <Route path="/community-guidelines" element={<CommunityGuidelines />} />
      <Route path="/security" element={<SecurityCompliance />} />
     
      {/* Private Routes for Innovators */}
      <Route element={<PrivateRoute allowedRoles={["innovator"]} />}>
        <Route path="/dashboard-innovator" element={<InnovatorDashboard />} />
        <Route path="/my-ideas" element={<Innovations />} />
        <Route path="/my-ideas/create" element={<CreateInnovation />} />
        <Route path="/my-ideas/edit/:id" element={<EditInnovation />} />
        <Route path="/my-ideas/:id" element={<ShowInnovation />} />
      </Route>

      {/* Private Routes for Investors */}
      <Route element={<PrivateRoute allowedRoles={["investor"]} />}>
        <Route path="/dashboard-investor" element={<InvestorDashboard />} />
      </Route>
      {/* both can access  */}
      <Route
        element={<PrivateRoute allowedRoles={["innovator", "investor"]} />}
      >
        {/* ✅ Add your common page */}
        <Route path="/chat" element={<Chats />} />{" "}
        <Route path="/my-activity" element={<MyActivity />} />{" "}
        <Route path="/profile" element={<Profile />} />{" "}
        <Route path="/innovations" element={<InnovationsList />} />
        <Route path="/innovations/:id" element={<InnovationDetail />} />
        <Route path="/innovators" element={<InnovatorsList />} />
        <Route path="/innovators/:id" element={<InnovatorProfile />} />
        <Route path="/investors" element={<InvestorsList />} />
        <Route path="/investors/:id" element={<InvestorProfile />} />
        <Route path="/investments" element={<InvestmentsList />} />
        <Route path="/investments/:id" element={<InvestmentDetail />} />
        <Route path="/commitments/:id" element={<Commitment />} />
      </Route>
       
      

      {/* Unauthorized Access Page */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};
{
  /* </AuthProvider> */
}
export default UserRoutes;
