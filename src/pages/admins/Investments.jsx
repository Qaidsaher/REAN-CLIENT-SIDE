import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from "../../services/admins/investmentService";
import AdminLayout from "../../layouts/AdminLayout";

const Investments = () => {
  const [investments, setInvestments] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchInvestments();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchInvestments = async () => {
    try {
      const data = await getInvestments();
      setInvestments(data);
    } catch (error) {
      console.error("Error fetching investments:", error);
      showMessage("Error fetching investments", "error");
    }
  };

  const handleCreate = async (newInvestment) => {
    try {
      await createInvestment(newInvestment);
      fetchInvestments();
      showMessage("Investment created successfully", "success");
    } catch (error) {
      console.error("Error creating investment:", error);
      showMessage("Error creating investment", "error");
    }
  };

  const handleEdit = async (updatedInvestment) => {
    try {
      await updateInvestment(updatedInvestment._id, updatedInvestment);
      fetchInvestments();
      showMessage("Investment updated successfully", "success");
    } catch (error) {
      console.error("Error updating investment:", error);
      showMessage("Error updating investment", "error");
    }
  };

  const handleDelete = async (investmentId) => {
    try {
      await deleteInvestment(investmentId);
      fetchInvestments();
      showMessage("Investment deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting investment:", error);
      showMessage("Error deleting investment", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"investments"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Investments</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={investments}
          fields={["investor", "amount", "status"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Investments;