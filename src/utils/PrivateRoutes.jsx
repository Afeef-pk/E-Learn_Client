import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userAuth } from "../Services/userApi";
import { adminAuth } from "../Services/adminApi";
import { tutorAuth } from "../Services/tutorApi";

function PrivateRoutes({ role, route }) {
  const dispatch = useDispatch();
  let [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      userAuth()
        .then((response) => {
          if (response.data.status) {
            setAuth(response.data.status);
          } else{
            setAuth(response.data.status);
            console.log('res '+response.data.status);
            localStorage.removeItem('token')
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else if (role === "admin") {
      adminAuth()
        .then((response) => {
          if (!response.data.status) {
          } else if (response.data.status) {
          }
          setAuth(response.data?.status);
        })
        .catch((response) => {
          console.log(response);
        });
    } else if (role === "tutor") {
      tutorAuth()
        .then((response) => {
          if (!response.data.status) {
          } else if (response.data.status) {
          }
          setAuth(response.data?.status);
        })
        .catch((response) => {
          console.log(response);
        });
    }
  }, []);
  console.log('auth'+auth);
  if (auth == null) return;
  return auth ? <Outlet /> : <Navigate to={route} />;
}

export default PrivateRoutes;
