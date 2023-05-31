import React from 'react'
import { HiUsers } from "react-icons/hi";

function Card() {
  return (
    <div className="mx-10 my-5 bg-[#1F2A40] rounded-md h-36 ">
          <div className="mx-10 pt-8 flex">
            {React.createElement(HiUsers, { size: "30", color: "#70D8BD"})}
            <span className="text-2xl mx-5">50</span>
          </div>
          <h1 className="mx-10 mt-3">Total Users</h1>
        </div>
  )
}

export default Card
