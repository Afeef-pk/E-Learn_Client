import React from 'react';
import {  MdOutlineGroups,} from "react-icons/md";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineExplore, MdOutlineMessage, MdEvent } from "react-icons/md";
function CommunityNavigation() {
    const groupData = useSelector(state => state.group);

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
        <div className="fixed flex   sm:hidden bottom-0 w-full z-50 border-t border-base-300 bg-base-100 ">
            <ul className="menu flex rounded-box menu-horizontal w-full justify-around items-end bg-base-100 my-5">
                {CommunitySidebarLink.map((item) => (
                    <li key={item.label}>
                        <Link
                            to={item.to}
                            className={item.to === location.pathname ? "text-primary" : ""}
                        >
                            {item.icon}
                        </Link>
                    </li>
                ))}
                {/* <li tabIndex="0">
                    <div className="dropdown dropdown-end dropdown-top p-0">
                        <label tabIndex="0" className="px-4 py-3">
                            <MdOutlineGroups size={24} />
                        </label>
                        <ul
                            tabIndex="0"
                            className="dropdown-content menu rounded-box h-60 w-52 overflow-y-auto bg-base-100 p-2 shadow"
                            style={{ bottom: "50px" }}
                        >
                            {groupData?.groups && groupData?.groups.map((group,index) => (
                                <li className='bg-slate-100 mt-1' key={index}>
                                    <div className="py-2">
                                        <span className="w-10 h-10 mask mask-circle bg-base-200  text-xl">
                                            <img class="w-10 h-10 rounded-full" src={import.meta.env.VITE_SERVER_URL + group.image.path} alt="Rounded avatar" />
                                        </span>
                                        <span className='truncate'>{group.name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </li> */}
            </ul>
        </div>
    )
}

export default CommunityNavigation