import React, { useEffect, useState } from "react";
import img from "/assets/admin/dashboard.svg";
import Card from "./Card";
import NavBar from "../NavBar/NavBar";
import { FaUserGraduate } from "react-icons/fa";
import {  MdOndemandVideo,MdPayment } from "react-icons/md";
import { HiUsers } from "react-icons/hi";
import { dashboardData } from "../../../Services/adminApi";

function AdminDashboard() {
  const [count,setCount] = useState([])
  const [currentDate, setCurrentDate] = useState("");
  useEffect(() => {
    dashboardData().then((res)=>{
      setCount(res.data)
    })
    const date = new Date();
    const month = date.toLocaleString("en-US", { month: "long" });
    const day = date.getDate();
    setCurrentDate(`${month} ${day}`);
  }, []); 
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <div className="flex  mx-10 max-sm:w-auto my-5 gap-5 ">
          <div className="w-9/12 h-auto  bg-[#1F2A40] rounded-md flex justify-between gap-5 ">
            <div className="text-xs sm:text-base md:text-lg lg:text-xl xl:text-2xl">
              <h1 className=" p-5 pb-0">Hello Admin 👋</h1>
              <h1 className=" pl-5 mt-2 text-[#70D8BD]">
                Welcome to Dashboard
              </h1>
              <h1 className="  pl-5 my-3">
                Congratulations, You have some good newses,
              </h1>
            </div>
            <div className="h-full">
            <img className="h-full max-md:hidden" src={img} alt="dashboard-pic" />
            </div>
          </div>
          <div className="w-3/12 bg-[#1F2A40]  max-sm:hidden rounded-md flex justify-center items-center">
            <h1 className="text-xs sm:text-xl md:text-2xl lg:text-2xl xl:text-3xl">{currentDate}</h1>
          </div>
        </div>
        <div className="grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
          <Card title="Total Users" icon={HiUsers} count={count.userCount} />
          <Card title="Total Tutors" icon={FaUserGraduate} count={count.tutorCount} />
          <Card title="Total Courses" icon={MdOndemandVideo} count={count.courseCount} />
          <Card title="Total Orders" icon={MdPayment} count={30} />
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
