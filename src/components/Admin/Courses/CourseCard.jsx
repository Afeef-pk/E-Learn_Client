import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { manageCourse } from "../../../Services/adminApi";
import { toast } from "react-hot-toast";
function CourseCard({ image, title, date, id, isApproved, status }) {
  const datee = date.slice(0, 10);
  const navigate = useNavigate();
  const [courseStatus, setStatus] = useState(status);
  const handleView = (id) => {
    navigate("/admin/course/view", { state: id });
  };

  const manage = (courseId) => {
    manageCourse(courseId).then((res) => {
      if (res.status === 200) {
        setStatus(!courseStatus)
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    });
  };
  return (
    <div className=" rounded-xl bg-[#1F2A40]">
      <img src={image} className="w-full rounded-t-xl" alt="course img" />
      <h1 className="text-xl font-bold mx-5 my-3">{title}</h1>
      <p className="my-2 mx-5 text-[#B3A4A4]">{datee}</p>
      <div className="mx-3 my-2 text-lg text-blue-700 ">
        <button onClick={() => handleView(id)} className="mx-2">
          View
        </button>
        {isApproved && (
          <button onClick={() => manage(id)} className="mx-7">
            {courseStatus ? "Hide Course" : "Show Course"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
