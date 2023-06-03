import React from 'react'


function Card({title,icon,count}) {
  return (
    <div className="mx-10 my-5 bg-[#1F2A40] rounded-md h-36 ">
          <div className="mx-10 pt-8 flex">
            {React.createElement(icon, { size: "30", color: "#70D8BD"})}
            <span className="text-2xl mx-5">{count}</span>
          </div>
          <h1 className="mx-10 mt-3">{title}</h1>
        </div>
  )
}

export default Card
