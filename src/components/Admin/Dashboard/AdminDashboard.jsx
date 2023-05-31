import React from "react";
import SideBar from "../SideBar/SideBar";
import { AiOutlineUser } from "react-icons/ai";
import { BiMoon } from "react-icons/bi";

import img from "/assets/admin/dashboard.svg";
import Card from "./Card";
function AdminDashboard() {
  return (
    <>
      <div className="h-screen w-full bg-[#141B2D] text-white">
        <div className="flex justify-end m-5 gap-6">
          {React.createElement(BiMoon, { size: "30", color: "white" })}
          {React.createElement(AiOutlineUser, { size: "30", color: "white" })}
        </div>
        <div className="flex  mx-10 max-sm:w-full my-5 gap-5 ">
          <div className="w-9/12 bg-[#1F2A40] rounded-md flex justify-between ">
            <div>
              <h1 className="text-2xl p-5 pb-0">Hello Admin 👋</h1>
              <h1 className="text-2xl pl-5 mt-2 text-[#70D8BD]">
                Welcome to Dashboard
              </h1>
              <h1 className="text-md pl-5 my-3">
                Congratulations, You have some good newses,
              </h1>
            </div>
            <img className="w-56 max-sm:hidden" src={img} alt="dashboard-pic" />
          </div>
          <div className="w-3/12 bg-[#1F2A40] max-sm:hidden rounded-md flex justify-center items-center">
            <h1 className="text-3xl">June 5</h1>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
