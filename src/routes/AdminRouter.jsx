import React,{useEffect} from "react";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "../pages/admin/LoginPage";
import { toast } from "react-hot-toast";
import Dashboard from "../pages/admin/Dashboard";
import UserListPage from "../pages/admin/UserListPage";
import TutorListPage from "../pages/admin/TutorListPage";
import CourseListPage from "../pages/admin/CourseListPage";
import PrivateRoutes from "../utils/PrivateRoutes";
import { adminAuthorized, adminUnauthorized } from "../Redux/app/adminSlice";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";

const AdminRouter = () => {
  const dispatch = useDispatch()
  const authStateListener = async () => {
    let token = localStorage.getItem("adminToken");
    if (token) {
      try {
        let decoded = await jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(adminAuthorized({token}));
        } else {
          toast.error("Session expired!, Please Signin.");
          localStorage.removeItem("adminToken");
          dispatch(adminUnauthorized());
        }
      } catch (error) {
        dispatch(adminUnauthorized());
      }
    }
  };
  useEffect(() => {
    
    authStateListener();
  }, []);

  return (    
    <Routes>
      <Route element={<PrivateRoutes role={"admin"} route={"/admin/"} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<UserListPage />} />
        <Route path="/tutors" element={<TutorListPage />} />
        <Route path="/courses" element={<CourseListPage />} />
      </Route>

      <Route element={<UnAuthenticatedOnlyRoutes role="admin"/>}>
        <Route path="/" element={<AdminLoginPage/>} />
      </Route>
      <Route path="/*" element={<div>page not found</div>} />
    </Routes>
  );
};

export default AdminRouter;
