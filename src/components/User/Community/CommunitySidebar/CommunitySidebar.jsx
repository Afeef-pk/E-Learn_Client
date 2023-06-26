import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore, MdOutlineMessage, MdEvent } from "react-icons/md";

function CommunitySidebar() {
  const dispatch = useDispatch();
  const groupData = useSelector((state) => state.group);
  const user = useSelector((state) => state.user);
  useEffect(() => {}, []);

  const CommunitySidebarLink = [
    {
      label: "Home",
      icon: <BiHomeAlt size={22} />,
      to: "/community",
    },
    {
      label: "Explore groups",
      icon: <MdOutlineExplore size={22} />,
      to: "/groups",
    },
    {
      label: "Messages",
      icon: <MdOutlineMessage size={22} />,
      to: "/messages",
    },
  ];
  return (
    <>
      <ul className="menu hidden sm:flex sm:flex-col overflow-y-auto bg-base-100 text-base xl:w-64 m-10">
        {CommunitySidebarLink.map((item) => (
          <li
            key={item.label}
            className={`${
              item.to === location.pathname
                ? "border-l-4 border-blue-500"
                : "border-l-4 border-base-100"
            }`}>
            <Link to={item.to}>
              <div className="flex m-5">
                {item.icon}
                <span className="hidden xl:block mx-4">{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
        <div className="my-3 border-t border-base-300" />

        {/* {user.email && groupData.groups ? (
          <div>
            <h3 className="hidden px-5 py-2 text-xs font-bold uppercase text-gray-500 xl:block">
              Groups
            </h3>
            {groupData.groups &&
              groupData.groups.map((group, index) => (
                <li key={index}>
                  <div className="py-1">
                    <span className="mask mask-circle bg-base-200  text-xl">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={import.meta.env.VITE_SERVER_URL + group.image.path}
                        alt="Rounded avatar"
                      />
                    </span>
                    <span className="hidden xl:block">{group.name}</span>
                  </div>
                </li>
              ))}
          </div>
        ) : (
          ""
        )} */}
      </ul>
    </>
  );
}

export default CommunitySidebar;
