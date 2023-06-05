import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import image from "/assets/tutor/default-dp.png";
import { useLocation, useNavigate } from "react-router-dom";
import { getTutorDetails } from "../../../Services/adminApi";

function TutorView() {
  const location = useLocation();
  const tutorId = location.state?.userId;
  const [tutor, setTutor] = useState(null);
  const navigate = useNavigate();

  const handleApprove = (status) => {
    const tutorView = false
    getTutorDetails(tutorId,tutorView, status).then((res) => {
      navigate("/admin/tutors");
    })
  }
  useEffect(() => {
    const tutorView = true
    getTutorDetails(tutorId,tutorView).then((res) => {
      setTutor(res.data.tutor);
    })
  }, [])

  return (
    <div className="h-auto w-full bg-[#141B2D]">
      <NavBar />
      <h1 className="text-3xl mx-5 uppercase  text-white  font-bold tracking-widest">
        Tutor Detail
      </h1>
      <div className="bg-[#1F2A40]  h-auto m-10 grid grid-cols-10 text-white shadow-slate-200">
        {/* <div className="mt-20 w-fit mx-auto col-span-3">
          <img
            src={image}
            className="rounded-full w-36 "
            alt="profile picture"
          />
        </div> */}
        <div className="col-span-7 font-normal font-sans">
          <h1 className="text-2xl px-10 py-5">
            Name :<span className="px-7">{tutor?.name}</span>
          </h1>
          <h1 className="text-2xl px-10 py-3">
            E-mail :<span className="px-7">{tutor?.email}</span>
          </h1>
          <h1 className="text-2xl px-10 py-3">
            Phone :<span className="px-7">{tutor?.phone}</span>
          </h1>
          <h1 className="text-2xl px-10 py-3">
            About :<span className="px-7">{tutor?.about}</span>
          </h1>
          <h1 className="text-2xl px-10 py-3">Certificate :</h1>
          <img
            src={tutor?.certificate}
            className="h-40 px-10"
            alt="certificate"
          />
          <div className="p-7">
            <button
              onClick={()=>handleApprove(false)}
              className="w-32 bg-red-500 text-center py-3 mx-3 rounded-xl  text-white hover:bg-[#ff1c1c] focus:outline-none my-1">
              Reject
            </button>
            <button
              onClick={()=>handleApprove(true)}
              className="w-32 bg-green-700 text-center py-3 rounded-xl  text-white hover:bg-[#1e4612] focus:outline-none my-1">
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorView;
