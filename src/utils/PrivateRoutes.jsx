import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { userAuth } from "../Services/userApi";
import { adminAuth } from "../Services/adminApi";

function PrivateRoutes({ role, route }) {
  const dispatch = useDispatch();
  let [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (role === "user") {
      userAuth()
        .then((response) => {
          if (!response.data.status) {
          } else if (response.data.status) {
          }
          setAuth(response.data?.status);
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
    }
    //else if(role==="expert"){
    //     authExpert().then(resp=>{
    //         if(!resp.data.auth){
    //             localStorage.removeItem('experttoken')
    //             dispatch(expertlogout())
    //         }else{
    //             dispatch(expertlogin(resp.data))
    //         }
    //         setAuth(resp.data.auth)
    //     }).catch(resp=>{
    //         setAuth(resp.data?.auth || null)
    //         navigate('/expert/login')
    //     })
    //   }
  },[]);

  if (auth == null) return;
  return auth ? <Outlet />  : <Navigate to={route} />;
}

export default PrivateRoutes;
