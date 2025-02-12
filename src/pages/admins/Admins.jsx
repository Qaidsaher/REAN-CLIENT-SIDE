import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../services/admins/adminServices";
import AdminLayout from "../../layouts/AdminLayout";

const Admins = () => {
  const [admins, setAdmins] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchAdmins();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchAdmins = async () => {
    try {
      const data = await getAdmins();
      setAdmins(data);
    } catch (error) {
      console.error("Error fetching admins:", error);
      showMessage("Error fetching admins", "error");
    }
  };

  const handleCreate = async (newAdmin) => {
    try {
      await createAdmin(newAdmin);
      fetchAdmins();
      showMessage("Admin created successfully", "success");
    } catch (error) {
      console.error("Error creating admin:", error);
      showMessage("Error creating admin", "error");
    }
  };

  const handleEdit = async (updatedAdmin) => {
    try {
      await updateAdmin(updatedAdmin._id, updatedAdmin);
      fetchAdmins();
      showMessage("Admin updated successfully", "success");
    } catch (error) {
      console.error("Error updating admin:", error);
      showMessage("Error updating admin", "error");
    }
  };

  const handleDelete = async (adminId) => {
    try {
      await deleteAdmin(adminId);
      fetchAdmins();
      showMessage("Admin deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting admin:", error);
      showMessage("Error deleting admin", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"admins"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Admins</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={admins}
          fields={["name", "email", "role"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Admins;
