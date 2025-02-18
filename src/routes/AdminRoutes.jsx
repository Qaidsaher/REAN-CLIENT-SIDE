import React from "react";
import { Routes, Route } from "react-router-dom";
import Innovations from "../pages/admins/innovations/Innovations";
import Investments from "../pages/admins/Investments";
import Admins from "../pages/admins/Admins";
import Notifications from "../pages/admins/Notifications";
import Chatting from "../pages/admins/Chatting";
import Settings from "../pages/admins/Settings";
import Profile from "../pages/admins/Profile";
import Category from "../pages/admins/Category";
import PrivateRoute from "./PrivateRoute";
import Index from "../pages/admins/Index";
import CreateInnovation from "../pages/admins/innovations/CreateInnovation";
import EditInnovation from "../pages/admins/innovations/EditInnovation";
import ShowInnovation from "../pages/admins/innovations/ShowInnovation";
import CreateUser from "../pages/admins/users/CreateUser";
import EditUser from "../pages/admins/users/EditUser";
import ShowUser from "../pages/admins/users/ShowUser";
import UserInnovators from "../pages/admins/users/UserInnovators";
import UserInvestors from "../pages/admins/users/UserInvestors";
import InvestmentDetails from "../pages/admins/InvestmentDetails";


const AdminRoutes = () => {
  return (
    <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
      <Route path="/admin/index" element={<Index />} />
      <Route path="/admin/categories" element={<Category />} />

      <Route path="/admin/innovations" element={<Innovations />} />
      <Route path="/admin/innovations/create" element={<CreateInnovation />} />
      <Route path="/admin/innovations/edit/:id" element={<EditInnovation />} />
      <Route path="/admin/innovations/:id" element={<ShowInnovation />} />

      <Route path="/admin/innovators" element={<UserInnovators />} />
      <Route path="/admin/investors" element={<UserInvestors />} />
      <Route path="/admin/users/create" element={<CreateUser />} />
      <Route path="/admin/users/edit/:userId" element={<EditUser />} />
      <Route path="/admin/users/:userId" element={<ShowUser />} />




      <Route path="/admin/investments" element={<Investments />} />
      <Route path="/admin/investments/:id" element={<InvestmentDetails />} />

      <Route path="/admin/admins" element={<Admins />} />
      <Route path="/admin/notifications" element={<Notifications />} />
      <Route path="/admin/chatting" element={<Chatting />} />
      <Route path="/admin/settings" element={<Settings />} />
      <Route path="/admin/profile" element={<Profile />} />
    </Route>
  );
};

export default AdminRoutes;
