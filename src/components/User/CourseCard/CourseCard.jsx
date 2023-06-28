import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course, myCourse, totalProgress }) {
  console.log(myCourse);
  return (
    <Link
      to={
        myCourse
          ? `/course/view/${course._id}`
          : `/course-details/${course._id}`
      }>
      <div className="bg-[#e0dddda9] rounded-b-xl w-60 pb-2 transition duration-300  transform hover:scale-110 ">
        <img
          className="w-full h-36 rounded-t-xl"
          src={course?.imageURL}
          alt=""
        />
        <div className="h-10">
          <h1 className="mx-3 mt-2 font-bold text-black text-base">
            {course?.name.length <= 50
              ? course?.name
              : `${course?.name.slice(0, 50)}...`}
          </h1>
        </div>
        <h1 className="mx-3 my-2 font-medium text-blue-400 text-sm">
          {course?.teacher.name}
        </h1>
        {!myCourse && <p className="mx-3 font-bold">₹{course?.price}</p>}
        {/* <div className="flex items-center mx-3">
    <svg aria-hidden="true" className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
    <svg aria-hidden="true" className="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
</div> */}
        {myCourse && (
          <div className="m-3">
            <div className="w-full  rounded-full h-1  mb-2 bg-gray-700">
              <div
                className=" h-1 rounded-full bg-blue-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <p className="text-xs font-sans font-semibold">
              {totalProgress}% complete
            </p>
          </div>
        )}
      </div>
    </Link>
  );
}

export default CourseCard;
