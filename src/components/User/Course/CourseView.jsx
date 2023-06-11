import React, { useEffect, useState } from "react";
import { getCourseView } from "../../../Services/userApi";
import { useParams } from "react-router-dom";
import BuyNowCard from "./BuyNowCard";
import SyllabusDropdown from "./SyllabusDropdown/SyllabusDropdown";


function CourseView() {
    const [courseDetails,setCourseDetails] = useState([])
    const { courseId } = useParams()
   
    
    const toggleDropdown = index => {
      let course = courseDetails.course.map((course, i) => {
          if (i === index) {
              course.open = !course.open;
          } else {
              course.open = false;
          }
          return course;
      })
      setCourseDetails({ ...courseDetails, course });
  };

  useEffect(()=>{
    window.scrollTo(0, 0);
    getCourseView(courseId).then((res)=>{
        setCourseDetails(res.data.courseDetails)
    })
},[])
  return (
    <section>
      <div className="p-2 lg:p-20 lg:pb-10 mx-auto sm:p-14">
        <div className="flex flex-col-reverse sm:flex-row xl:px-20">
          <div className="w-full lg:w-8/12 ">
            <div className="hidden sm:block xl:ml-1 mb-8">
              <h1 className="text-3xl font-semibold mb-4 ">
                {courseDetails.name}
              </h1>
              <p className="mb-3 mr-6">{courseDetails.about}</p>
              <h3 className="text-[#6255a4] text-2xl font-semibold mb-3">
                Syllabus
              </h3>
            </div>

            <h3 className="text-xl text-theme-color mt-8 font-semibold mb-4 block sm:hidden ">
              Syllabus
            </h3>

            <div className="App">
              <div className="syllabus syllabus-wrap rounded-lg">
                {courseDetails.course?.map((course, index) => (
                    <SyllabusDropdown
                      course={course}
                      index={index}
                      key={index}
                      toggleDropdown={toggleDropdown}
                    />
                  ))}
              </div>
            </div>

            {/* //author section */}
            <div>
              <h3 className="text-2xl  mt-8 font-semibold mb-4 ">Tutor</h3>
              <blockquote className="rounded-lg bg-gray-100 p-8">
                <div className="flex items-center gap-4">
                  <img
                    alt="Man"
                    src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                    className="h-16 w-16 rounded-full object-cover"
                  />

                  <div>
                    <p className="mt-1 text-lg font-medium text-gray-700">
                      {courseDetails.teacher && courseDetails.teacher.name}
                    </p>
                  </div>
                </div>

                <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                  {courseDetails.teacher && courseDetails.teacher.about}
                </p>
              </blockquote>
            </div>

            <div>
              <h3 className="text-2xl  mt-8 font-semibold mb-4 ">About</h3>
              <div className="border rounded-md p-3 ">
                {courseDetails?.description}
                <p className="text-slate-600 mt-4"></p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-4/12 flex-column  flex  flex-col  items-center sm:items-start ml-0 sm:ml-10 sm:h-screen top-0 sm:sticky ">
            <div className="block sm:hidden p-2 mt-3 mb-3">
              <h1 className="text-3xl font-semibold mb-4">
                {courseDetails.name}
              </h1>
              <p className="mb-3">{courseDetails.about}</p>
            </div>
            {courseDetails.name && (
              <BuyNowCard courseDetails={courseDetails} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseView;