import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getInvestors,
  createInvestor,
  updateInvestor,
  deleteInvestor,
} from "../../services/admins/investorService";
import AdminLayout from "../../layouts/AdminLayout";

const Investors = () => {
  const [investors, setInvestors] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchInvestors();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchInvestors = async () => {
    try {
      const data = await getInvestors();
      setInvestors(data);
    } catch (error) {
      console.error("Error fetching investors:", error);
      showMessage("Error fetching investors", "error");
    }
  };

  const handleCreate = async (newInvestor) => {
    try {
      await createInvestor(newInvestor);
      fetchInvestors();
      showMessage("Investor created successfully", "success");
    } catch (error) {
      console.error("Error creating investor:", error);
      showMessage("Error creating investor", "error");
    }
  };

  const handleEdit = async (updatedInvestor) => {
    try {
      await updateInvestor(updatedInvestor._id, updatedInvestor);
      fetchInvestors();
      showMessage("Investor updated successfully", "success");
    } catch (error) {
      console.error("Error updating investor:", error);
      showMessage("Error updating investor", "error");
    }
  };

  const handleDelete = async (investorId) => {
    try {
      await deleteInvestor(investorId);
      fetchInvestors();
      showMessage("Investor deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting investor:", error);
      showMessage("Error deleting investor", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"investors"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Investors</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={investors}
          fields={["firstName","lastName","email","education","phone","birthday","publishDate"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Investors;