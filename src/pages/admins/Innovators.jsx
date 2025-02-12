import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getInnovators,
  createInnovator,
  updateInnovator,
  deleteInnovator,
} from "../../services/admins/innovatorService";
import AdminLayout from "../../layouts/AdminLayout";

const Innovators = () => {
  const [innovators, setInnovators] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchInnovators();

  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchInnovators = async () => {
    try {
      const data = await getInnovators();
     
      setInnovators(data);
    } catch (error) {
      console.error("Error fetching innovators:", error);
      showMessage("Error fetching innovators", "error");
    }
  };

  const handleCreate = async (newInnovator) => {
    try {
      await createInnovator(newInnovator);
      fetchInnovators();
      showMessage("Innovator created successfully", "success");
    } catch (error) {
      console.error("Error creating innovator:", error);
      showMessage("Error creating innovator", "error");
    }
  };

  const handleEdit = async (updatedInnovator) => {
    try {
      await updateInnovator(updatedInnovator._id, updatedInnovator);
      fetchInnovators();
      showMessage("Innovator updated successfully", "success");
    } catch (error) {
      console.error("Error updating innovator:", error);
      showMessage("Error updating innovator", "error");
    }
  };

  const handleDelete = async (innovatorId) => {
    try {
      await deleteInnovator(innovatorId);
      fetchInnovators();
      showMessage("Innovator deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting innovator:", error);
      showMessage("Error deleting innovator", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"innovators"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Innovators</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={innovators}
          fields={["firstName","lastName","email","city","education","phone","birthday"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Innovators;
