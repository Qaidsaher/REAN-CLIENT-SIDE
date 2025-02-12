import React from "react";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar"; // Default Navbar
import InnovatorNavbar from "../components/Layout/InnovatorNavbar"; // Innovator Navbar
import InvestorNavbar from "../components/Layout/InvestorNavbar"; // Investor Navbar
import { useAuth } from "../contexts/AuthContext"; // ✅ Import Auth Context
import FloatingButton from "../components/FloatingButton";

const GuestLayout = ({ children, selectedPage = "/" }) => {
  const auth = useAuth(); // ✅ Ensure auth is retrieved safely
  const role = auth?.role || "guest"; // ✅ Default to "guest" if undefined

  // ✅ Render the appropriate navbar
  const renderNavbar = () => {
    if (role === "innovator") return <InnovatorNavbar selectedPage={selectedPage} />;
    if (role === "investor") return <InvestorNavbar selectedPage={selectedPage} />;
    return <Navbar selectedPage={selectedPage} />; // ✅ Default Navbar for guests
  };

  return (
    <div className="flex flex-col min-h-screen">
      {renderNavbar()}
      <main className="flex-1 pt-16">{children}</main>
      <FloatingButton />
      <Footer />
    </div>
  );
};

export default GuestLayout;
