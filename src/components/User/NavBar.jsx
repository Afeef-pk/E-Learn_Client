import React,{useEffect, useState} from "react";
import { useDispatch } from "react-redux";
import { userUnauthorized } from "../../Redux/app/userSlice";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";

function NavBar() {
  const [user, setUser] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const location = useLocation()
  const handleLogout = () => {
    localStorage.clear("token");
    dispatch(userUnauthorized());
    setUser(null);
  };

  return (
    <header className="bg-[#232946] text-white h-20">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <nav className="flex justify-between items-center w-[92%] mx-auto ">
        <div>
          <img
            className="w-16 mt-2"
            src="data:image/png;base64,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"
            alt=""
          />
        </div>
        <div className="">
          <ul className="flex font-semibold gap-[4vw]">
            <li>
              <Link className="hover:text-gray-500" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/course">
                Course
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/tutor">
                Tutors
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/news">
                News
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="/profile">
                Account
              </Link>
            </li>
          </ul>
        </div>
        <div>
          {!user ? (
            <Link to="/signin">
              <Button
                variant="contained"
                color="info"
                className="bg-[#5f8dd7] text-white px-5 py-2 rounded-full hover:bg-blue-500 font-semibold">
                signin
              </Button>
            </Link>
          ) : (
            <Button
              variant="contained"
              onClick={handleLogout}
              color="error"
              className="bg-[#5f8dd7] text-white px-5 py-2 rounded-full hover:bg-blue-500 font-semibold">
              Logout
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
