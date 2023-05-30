import React from "react";
import { Route, Routes } from "react-router-dom";
import UserLoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";
import UserHomePage from "../pages/user/UserHomePage";
import UserOtp from "../components/Auth/SignUp/UserOtp";
import PrivateRoutes from "../utils/PrivateRoutes";

const UserRouter = () => {
  return (
    <Routes>
       <Route element={<PrivateRoutes role={"user"} route={"/signin"} />}>
       <Route path="/profile" element={<div>this is profile page</div>} />
       </Route>

      <Route path="/" element={<UserHomePage/>} />
      <Route path="/signup" element={<UserSignupPage />} />
      <Route path="/otp" element={<UserOtp />} />
      <Route path="/signin" element={<UserLoginPage />} />
      <Route path="/*" element={<div>page not found</div>} />

    </Routes>
  );
};

export default UserRouter;
