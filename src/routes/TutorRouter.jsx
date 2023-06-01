import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorLoginPage from "../pages/tutor/TutorLoginPage";
import TutorSignupPage from "../pages/tutor/TutorSignupPage";
import DashboardPage from "../pages/tutor/DashboardPage";



const TutorRouter = () =>{
    return (
        <Routes>
          <Route path="/" element={<TutorLoginPage/>} />
          <Route path="/signup" element={<TutorSignupPage/>} />
          <Route path="/dashboard" element={<DashboardPage/>}  />
        </Routes>
      );
}

export default TutorRouter;