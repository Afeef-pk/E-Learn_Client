import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseDetails } from "../../../Services/adminApi";

function CourseView() {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state;
  const [course, setCourse] = useState([]);

  const handleApprove = (status) => {
    getCourseDetails(courseId, status).then((response) => {
      navigate("/admin/courses");
    });
  };
  useEffect(() => {
    getCourseDetails(courseId).then((response) => {
      setCourse(response.data.course);
    });
  }, []);
  console.log(course.courseURL);
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Courses
        </h1>
        <div className="h-auto  rounded-lg m-10 bg-[#1F2A40] pb-5">
          <div className="flex  justify-center">
            <div className="my-5 rounded-xl">
              <video width="320" height="140" controls>
                <source src={course.courseURL} />
              </video>
            </div>
          </div>
          <div className=" mx-14 bg-[#141B2D] rounded-md mb-3">
            <p className="text-xl p-5">
              Tittle : <span className="px-5">{course.name}</span>
            </p>
            <p className="text-xl p-5">
              About : <span className="px-5">{course.about}</span>
            </p>
            <p className="text-xl p-5 ">
              Duration : <span className="px-5">{course.duration}</span>
            </p>
            <p className="text-xl p-5">
              Language : <span className="px-5">{course.language}</span>
            </p>
            <p className="text-xl p-5">
              Category : <span className="px-5">{course.category}</span>
            </p>
            <p className="text-xl p-5">
              Description : <span className="px-5">{course.description}</span>
            </p>
            <p className="text-xl p-5">
              Price : <span className="px-5">{course.price}</span>
            </p>
          </div>
          <div className="flex justify-end mx-32">
            {!course.isApproved && (
              <>
                <button
                  onClick={() => handleApprove(false)}
                  className="bg-red-500 px-3 py-2 rounded-xl  text-center  text-white focus:outline-none my-1">
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(true)}
                  className="bg-green-500 px-3 py-2 rounded-xl mx-5 text-center  text-white  focus:outline-none my-1">
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
