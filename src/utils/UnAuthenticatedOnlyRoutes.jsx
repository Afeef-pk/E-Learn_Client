import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { userAuth } from "../Services/userApi";
import { adminAuth } from "../Services/adminApi";
import { tutorAuth } from "../Services/tutorApi";
import { adminAuthorized, adminUnauthorized } from "../Redux/app/adminSlice";
import { userAuthorized, userUnauthorized } from "../Redux/app/userSlice";
import { tutorAuthorized, tutorUnauthorized } from "../Redux/app/tutorSlice";

function UnAuthenticatedOnlyRoutes({ role, route }) {
  const dispatch = useDispatch();
  let [auth, setAuth] = useState(null);
  useEffect(() => {
    if (role === "user") {
      userAuth()
        .then((response) => {
          console.log('u route');
          if (response.data.status) {
            const token = localStorage.getItem("token");
            dispatch(userAuthorized({ token }));
            setAuth(response.data.status);
          } else {
            setAuth(response.data.status);
            dispatch(userUnauthorized());
            localStorage.removeItem("token");
          }
          if (response.data.message) {
            toast.error(response.data.message);
          }
        })
        .catch((response) => {
          setAuth(false);
          localStorage.removeItem("token");
        });
    } else if (role === "admin") {
      adminAuth()
        .then((response) => {
          if (response.data.status) {
            const token = localStorage.getItem("adminToken");
            dispatch(adminAuthorized({ token }));
            setAuth(response.data.status);
          } else {
            setAuth(response.data.status);
            dispatch(adminUnauthorized());
            localStorage.removeItem("adminToken");
          }
        })
        .catch((response) => {
          setAuth(false);
          localStorage.removeItem("adminToken");
        });
    } else if (role === "tutor") {
      tutorAuth()
        .then((response) => {
          if (response.data.status) {
            const token = localStorage.getItem("tutorToken");
            dispatch(tutorAuthorized({ token }));
            setAuth(response.data.status);
          } else {
            setAuth(response.data.status);
            dispatch(tutorUnauthorized());
            localStorage.removeItem("tutorToken");
          }
          if (response.data.message) {
            toast.error(response.data.message);
          }
        })
        .catch((response) => {
          setAuth(false);
          localStorage.removeItem("tutorToken");
        });
    }
  },[]);
  if (auth == null) return;
  return !auth ? <Outlet /> : <Navigate to={route} />;
}

export default UnAuthenticatedOnlyRoutes;
