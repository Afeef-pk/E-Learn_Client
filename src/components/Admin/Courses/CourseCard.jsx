import React from "react";

function CourseCard({image,title,date,id,isApproved}) {
    const datee = date.slice(0, 10);
  return (
    <div className=" rounded-xl bg-[#1F2A40]">
      <img src={image} className="w-full rounded-t-xl" alt="course img" />
      <h1 className="text-xl font-bold mx-5 my-3">{title}</h1>
      <p className="my-2 mx-5 text-[#B3A4A4]">{datee}</p>
      <div className="mx-3 my-2 text-xl text-blue-700 ">
        <button className="mx-2">View</button>
       {isApproved&& <button className="mx-10">Hide Course</button>} 
      </div>
    </div>
  );
}

export default CourseCard;
