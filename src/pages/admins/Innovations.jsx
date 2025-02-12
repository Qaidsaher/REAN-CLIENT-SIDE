import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getInnovations,
  createInnovation,
  updateInnovation,
  deleteInnovation,
} from "../../services/admins/innovationService";
import AdminLayout from "../../layouts/AdminLayout";

const Innovations = () => {
  const [innovations, setInnovations] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchInnovations();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchInnovations = async () => {
    try {
      const data = await getInnovations();
      setInnovations(data);
    } catch (error) {
      console.error("Error fetching innovations:", error);
      showMessage("Error fetching innovations", "error");
    }
  };

  const handleCreate = async (newInnovation) => {
    try {
      await createInnovation(newInnovation);
      fetchInnovations();
      showMessage("Innovation created successfully", "success");
    } catch (error) {
      console.error("Error creating innovation:", error);
      showMessage("Error creating innovation", "error");
    }
  };

  const handleEdit = async (updatedInnovation) => {
    try {
      await updateInnovation(updatedInnovation._id, updatedInnovation);
      fetchInnovations();
      showMessage("Innovation updated successfully", "success");
    } catch (error) {
      console.error("Error updating innovation:", error);
      showMessage("Error updating innovation", "error");
    }
  };

  const handleDelete = async (innovationId) => {
    try {
      await deleteInnovation(innovationId);
      fetchInnovations();
      showMessage("Innovation deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting innovation:", error);
      showMessage("Error deleting innovation", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"innovations"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Innovations</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={innovations}
          fields={["title", "description", "status"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Innovations;
