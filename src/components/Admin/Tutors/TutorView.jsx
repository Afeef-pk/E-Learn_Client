import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import image from "/assets/home-kid.png";
import { useLocation } from "react-router-dom";
import { getTutorDetails } from "../../../Services/adminApi";

function TutorView() {
  const location = useLocation();
  const tutorId = location.state;
  const [tutor,setTutor] = useState(null)
  useEffect(() => {
    getTutorDetails(tutorId).then((res)=>{
        setTutor(tutor)
    })
  },[])
  console.log(tutor);
  return (
    <div className="h-auto w-full bg-[#141B2D]">
      <NavBar />
      <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
        Tutor Detail
      </h1>
      <div className="bg-[#1F2A40] h-96 m-10 grid grid-cols-10 text-white shadow-slate-200">
        <div className=" bg-black col-span-3 m-16">
          <img src={image} alt="" />
        </div>
        <div className="col-span-7">
          <h1 className="text-2xl px-10 py-5 font-semibold tracking-normal">
            {" "}
            Name :{tutor?.name}
          </h1>
          <h1 className="text-2xl px-10 py-5 font-semibold tracking-normal">
            E-mail :
          </h1>
          <h1 className="text-2xl px-10 py-5 font-semibold tracking-normal">
            Phone :
          </h1>
          <h1 className="text-2xl px-10 py-5 font-semibold tracking-normal">
            About :
          </h1>
        </div>
      </div>
    </div>
  );
}

export default TutorView;
