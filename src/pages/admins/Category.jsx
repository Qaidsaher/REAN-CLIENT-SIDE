import React, { useEffect, useState } from "react";
import Table from "../../components/UI/Table";
import Notification from "../../components/UI/Notification";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/admins/categoryService";
import AdminLayout from "../../layouts/AdminLayout";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  useEffect(() => {
    fetchCategories();
  }, []);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showMessage("Error fetching categories", "error");
    }
  };

  const handleCreate = async (newCategory) => {
    try {
      await createCategory(newCategory);
      fetchCategories();
      showMessage("Category created successfully", "success");
    } catch (error) {
      console.error("Error creating category:", error);
      showMessage("Error creating category", "error");
    }
  };

  const handleEdit = async (updatedCategory) => {
    try {
      await updateCategory(updatedCategory._id, updatedCategory);
      fetchCategories();
      showMessage("Category updated successfully", "success");
    } catch (error) {
      console.error("Error updating category:", error);
      showMessage("Error updating category", "error");
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      fetchCategories();
      showMessage("Category deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting category:", error);
      showMessage("Error deleting category", "error");
    }
  };

  return (
    <AdminLayout selectedNav={"categories"}>
      <div className="p-2">
        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>
        <Notification
          message={message}
          messageType={messageType}
          onClose={() => setMessage(null)}
        />
        <Table
          data={categories}
          fields={["name"]}
          onCreate={handleCreate}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </AdminLayout>
  );
};

export default Category;
