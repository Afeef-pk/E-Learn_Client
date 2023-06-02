import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-hot-toast";
import PrivateRoutes from "../utils/PrivateRoutes";
import TutorLoginPage from "../pages/tutor/TutorLoginPage";
import TutorSignupPage from "../pages/tutor/TutorSignupPage";
import DashboardPage from "../pages/tutor/DashboardPage";
import CoursePage from "../pages/tutor/CoursePage";
import MessagePage from "../pages/tutor/MessagePage";
import ProfilePage from "../pages/tutor/ProfilePage";
import { useDispatch } from "react-redux";
import { tutorAuthorized, tutorUnauthorized } from "../Redux/app/tutorSlice";
import UnAuthenticatedOnlyRoutes from "../utils/UnAuthenticatedOnlyRoutes";
import jwt_decode from "jwt-decode";

const TutorRouter = () => {
  const dispatch = useDispatch();
  const authStateListener = async () => {
    let token = localStorage.getItem("tutorToken");
    if (token) {
      try {
        let decoded = await jwt_decode(token);
        if (decoded.exp * 1000 > Date.now()) {
          dispatch(tutorAuthorized({ token }));
        } else {
          toast.error("Session expired!, Please Signin.");
          localStorage.removeItem("tutorToken");
          dispatch(tutorUnauthorized());
        }
      } catch (error) {
        dispatch(tutorUnauthorized());
      }
    }
  };
  useEffect(() => {
    authStateListener();
  }, []);
  return (
    <Routes>
      <Route element={<PrivateRoutes role={"tutor"} route={"/tutor"} />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/course" element={<CoursePage />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<UnAuthenticatedOnlyRoutes role="tutor" />}>
        <Route path="/" element={<TutorLoginPage />} />
        <Route path="/signup" element={<TutorSignupPage />} />
      </Route>
    </Routes>
  );
};

export default TutorRouter;
