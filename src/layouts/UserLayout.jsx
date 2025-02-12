import React from "react";
import Footer from "../components/Layout/Footer";
import Navbar from "../components/Layout/Navbar"; // Default Navbar
import InnovatorNavbar from "../components/Layout/InnovatorNavbar"; // Innovator Navbar
import InvestorNavbar from "../components/Layout/InvestorNavbar"; // Investor Navbar
import { useAuth } from "../contexts/AuthContext"; // ✅ Import Auth Context
import FloatingButton from "../components/FloatingButton";

const UserLayout = ({ selectedPage, children }) => {
  // ✅ Determine which Navbar to use
  const { role } = useAuth();
  const renderNavbar = () => {
    if (role === "innovator") {
      return <InnovatorNavbar selectedPage={selectedPage} />;
    }
    if (role === "investor") {
      return <InvestorNavbar selectedPage={selectedPage} />;
    }
    return <Navbar selectedPage={selectedPage} />; // Default Navbar
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 w-full">
      {renderNavbar()}
      <div className="flex-1 mt-16">
        <main className=" max-w-7xl mx-auto py-6 px-4">{children}</main>
      </div>
      <FloatingButton/>
      <Footer />
    </div>
  );
};

export default UserLayout;
