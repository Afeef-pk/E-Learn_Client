import React, { useEffect,useState } from "react";
import NavBar from "../NavBar/NavBar";
import CourseCard from "./CourseCard";
import { getCourseData } from "../../../Services/adminApi";

function CourseList() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    getCourseData().then((res) => {
      setCourses(res.data.course);
    });
  },[]);
  
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Courses
        </h1>
        <div className="grid grid-cols-4 gap-10 m-8">
          {courses.map((course,index) => {
            return(
              <CourseCard key={index} image={course.imageURL} title={course.name} date={course.createdAt} id={course._id} isApproved={course.isApproved} status={course.status}/>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default CourseList;
