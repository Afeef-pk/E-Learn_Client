import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "../utils/PrivateRoutes";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import UserLoginPage from "../pages/user/UserLoginPage";
import UserSignupPage from "../pages/user/UserSignupPage";
import UserHomePage from "../pages/user/UserHomePage";
import UserOtp from "../components/Auth/SignUp/UserOtp";
import UserCoursePage from "../pages/user/UserCoursePage";
import CourseDetailsPage from "../pages/user/CourseDetailsPage";
import UserProfilePage from "../pages/user/UserProfilePage";

const UserRouter = () => {
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"user"} route={"/signin"} />}>
        <Route path="/profile" element={<UserProfilePage/>} />
      </Route>

      <Route element={<UnAuthenticatedOnlyRoutes role={"user"} route={"/"} />}>
        <Route path="/signin" element={<UserLoginPage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/otp" element={<UserOtp />} />
      </Route>

      <Route path="/" element={<UserHomePage />} />
      <Route path="/course" element={<UserCoursePage />} />
      <Route path="/course-details/:courseId" element={<CourseDetailsPage />} />
      <Route path="/*" element={<div>page not found</div>} />
    </Routes>
  );
};

export default UserRouter;
