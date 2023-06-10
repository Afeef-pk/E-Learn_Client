import React, { useState, useEffect } from "react";
import CourseCard from "../Home/CourseCard";
import { getCourseList } from "../../../Services/userApi";

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getCourseList().then((res) => {
      setCourses(res.data.courseData);
      setCategoryData(res.data.categoryData);
    });
  }, []);

  return (
    <div>
      <div className="my-5 mx-10 bg-[#f5f5f5 rounded-md flex text-black font-bold justify-between shadow-md shadow-gray-500 border-t-2 border-gray-300">
        <div className="mx-10">
          <button className="px-5 py-2 rounded-xl  bg-[#232946] ml-20 my-5 mr-5 text-white shadow-md shadow-gray-700 border-t-2">
            All Course
          </button>
          {categoryData.map((category, index) => {
            return (
              <button
                key={index}
                className="px-5 py-2 rounded-xl  bg-[#ffffff]  m-5 shadow-md shadow-gray-500 border-t-2">
                {category.name}
              </button>
            );
          })}
        </div>
        <div>
          <form className="flex items-center m-3">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-[#232946] rounded-lg border border-blue-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </div>
      <div className="my-10 gap-6 mx-20 max-sm:m-0 mb-8 bg-[#EFEFF6] grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
        {courses?.map((course, index) => {
          return <CourseCard key={index} course={course} />;
        })}
        {courses?.map((course, index) => {
          return <CourseCard key={index} course={course} />;
        })}
        {courses?.map((course, index) => {
          return <CourseCard key={index} course={course} />;
        })}
        {courses?.map((course, index) => {
          return <CourseCard key={index} course={course} />;
        })}
      </div>
    </div>
  );
}

export default CourseList;
