import React from "react";
import AdminLayout from "../../layouts/AdminLayout"; // ✅ Import AdminLayout
import DashboardSummary from "../../components/Admin/DashboardSummary";
import { useAuth } from "../../contexts/AuthContext";

const Dashboard = () => {
  // const { admin, loading } = useAdminAuth();
  const {user,role} = useAuth()
  if (role=="admin") return alert("admin")
  //  <p className="text-center text-gray-700">Loading...</p>;

  return (
    <AdminLayout selectedNav="dashboard"> {/* ✅ Highlight Dashboard in Sidebar */}
      <section className="max-w-7xl mx-auto py-16">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-8">
          Admin Dashboard
        </h1>
        <DashboardSummary />
      </section>
    </AdminLayout>
  );
};

export default Dashboard;
