import React,{useState,useEffect} from "react";
import { getEnrolledCourse } from "../../../Services/userApi";
import CourseCard from "../Home/CourseCard";

function MyCourses() {
  const [enrolledCourse, setEnrolledCourse] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      getEnrolledCourse()
        .then(({data}) => {
          setEnrolledCourse(data.userCourses);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      <div className="pl-9 mb-10">
        <h3 className="text-3xl sm:text-4xl  mt-8  mb-4 ml-2 sm:ml-5 ">
          My Enrollments
        </h3>
      </div>
      <div>
       {enrolledCourse?.length ? (
              <div className="my-10 gap-6 mx-20 max-sm:m-0 mb-8 bg-[#EFEFF6] grid h-96 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
              {enrolledCourse?.map((course, index) => {
                course.course={
                    ...course.course,
                    teacher:course.teacher
                }
                return <CourseCard key={index} course={course.course} myCourse={true}/>;
              })}
            </div>
        ) : (
          <div className="flex justify-center flex-col items-center mb-10">
            <img src="/assets/course/nocourse.svg" alt="" />
            <p>No enrolled courses</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MyCourses;
