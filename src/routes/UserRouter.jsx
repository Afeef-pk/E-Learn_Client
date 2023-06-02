import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import PrivateRoutes from "../utils/PrivateRoutes";
import { userAuthorized, userUnauthorized } from "../Redux/app/userSlice";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import UserLoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";
import UserHomePage from "../pages/user/UserHomePage";
import UserOtp from "../components/Auth/SignUp/UserOtp";

const UserRouter = () => {
  const dispatch = useDispatch();
  const authStateListener = async () => {
    let token = localStorage.getItem("token");
    if (token) {
      try {
        let decoded = await jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(userAuthorized({ token }));
        } else {
          toast.error("Session expired!, Please Signin.");
          localStorage.removeItem("token");
          dispatch(userUnauthorized());
        }
      } catch (error) {
        dispatch(userUnauthorized());
      }
    }
  };
  useEffect(() => {
    authStateListener();
  }, []);

  return (
    <Routes>
      <Route element={<PrivateRoutes role={"user"} route={"/signin"} />}>
        <Route path="/profile" element={<div>this is profile page</div>} />
      </Route>

      <Route element={<UnAuthenticatedOnlyRoutes role="user" />}>
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/otp" element={<UserOtp />} />
        <Route path="/signin" element={<UserLoginPage />} />
      </Route>

      <Route path="/" element={<UserHomePage />} />
      <Route path="/*" element={<div>page not found</div>} />
    </Routes>
  );
};

export default UserRouter;
