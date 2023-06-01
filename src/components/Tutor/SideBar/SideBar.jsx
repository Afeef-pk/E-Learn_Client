import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard,MdOndemandVideo } from "react-icons/md";
import {  CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import { AiOutlineMessage } from "react-icons/ai";
import { Link } from "react-router-dom";

const SideBar = () => {
  const menus = [
    { name: "Dashboard", link: "/tutor/dashboard", icon: MdOutlineDashboard },
    { name: "Courses", link: "/tutor/course", icon: MdOndemandVideo },
    { name: "Messages", link: "/tutor/message", icon: AiOutlineMessage },
    { name: "Account", link: "/tutor/profile", icon: CgProfile },
    { name: "Logout", link: "/", icon: BiLogOut },
  ];
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`bg-[#1F2A40] min-h-screen ${
        open ? "w-72" : "w-16"
      } duration-500 text-gray-100 px-4`}>
      <div className="py-3 flex justify-end">
        <HiMenuAlt3
          size={26}
          className="cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      </div>
      <div
        className={`mt-28 max-sm:mt-16 ${
          open ? "ml-5" : ""
        } max-sm:ml-0 flex flex-col gap-4 relative`}>
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            className={` ${
              menu?.margin && "mt-5"
            } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-950 rounded-md`}>
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}>
              {menu?.name}
            </h2>
            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
