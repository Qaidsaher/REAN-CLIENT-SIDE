import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/admins/Dashboard";
import Investors from "../pages/admins/Investors";
import Innovators from "../pages/admins/Innovators";
import Innovations from "../pages/admins/Innovations";
import Investments from "../pages/admins/Investments";
import Admins from "../pages/admins/Admins";
import Notifications from "../pages/admins/Notifications";
import Chatting from "../pages/admins/Chatting";
import Settings from "../pages/admins/Settings";
import Profile from "../pages/admins/Profile";
import Category from "../pages/admins/Category";
import Investors1 from "../pages/admins/Investors1";
import PrivateRoute from "./PrivateRoute";
import Index from "../pages/admins/Index";

const AdminRoutes = () => {
  return (
    <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
      <Route path="/admin/index" element={<Index />} />
      <Route path="/admin/categories" element={<Category />} />
      <Route path="/admin/categories" element={<Category />} />
      <Route path="/admin/investors1" element={<Investors1 />} />
      <Route path="/admin/investors" element={<Investors />} />
      <Route path="/admin/innovators" element={<Innovators />} />
      <Route path="/admin/innovations" element={<Innovations />} />
      <Route path="/admin/investments" element={<Investments />} />
      <Route path="/admin/admins" element={<Admins />} />
      <Route path="/admin/notifications" element={<Notifications />} />
      <Route path="/admin/chatting" element={<Chatting />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/profile" element={<Profile />} />
    </Route>
  );
};

export default AdminRoutes;
