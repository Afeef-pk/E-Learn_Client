import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/LoginPage";
import Dashboard from "../pages/admin/Dashboard";
import UserListPage from "../pages/admin/UserListPage";
import TutorListPage from "../pages/admin/TutorListPage";
import CourseListPage from "../pages/admin/CourseListPage";
import PrivateRoutes from "../utils/PrivateRoutes";

const AdminRouter = () => {
  return (
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
      <Route element={<PrivateRoutes role={"admin"} route={"/admin/"} />}>
        <Route path="/users" element={<UserListPage />} />
        <Route path="/tutors" element={<TutorListPage />} />
        <Route path="/courses" element={<CourseListPage />} />
      </Route>
      <Route path="/" element={<AdminLoginPage />} />
      <Route path="/*" element={<div>page not found</div>} />
    </Routes>
  );
};

export default AdminRouter;
