import React, { useEffect, useState } from "react";
import { getCourseView } from "../../../Services/userApi";
import { useParams } from "react-router-dom";
import BuyNowCard from "./BuyNowCard";
import SyllabusDropdown from "./SyllabusDropdown/SyllabusDropdown";

function CourseDetails() {
  const [courseDetails, setCourseDetails] = useState([]);
  const { courseId } = useParams();

  const toggleDropdown = (index) => {
    let course = courseDetails.course.map((course, i) => {
      if (i === index) {
        course.open = !course.open;
      } else {
        course.open = false;
      }
      return course;
    });
    setCourseDetails({ ...courseDetails, course });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getCourseView(courseId)
      .then((res) => {
        setCourseDetails(res.data.courseDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                    src={
                      courseDetails.teacher?.image
                        ? courseDetails.teacher.image
                        : "/assets/tutor/dp-tutor.avif"
                    }
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
            {courseDetails.name && <BuyNowCard courseDetails={courseDetails} />}
          </div>
        </div>
      </div>

      <article className="px-40 my-10">
        <h1 className="text-xl font-bold my-3" >Reviews & Ratings</h1>
        <div className="flex items-center mb-4 space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt=""
          />
          <div className="space-y-1 font-medium dark:text-white">
            <p>
              Jese Leos{" "}
              <time
                datetime="2014-08-16 19:00"
                className="block text-sm text-gray-500 dark:text-gray-400">
                Joined on August 2014
              </time>
            </p>
          </div>
        </div>
        <div className="flex items-center mb-1">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
            Thinking to buy another one!
          </h3>
        </div>
        <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Reviewed in the United Kingdom on{" "}
            <time datetime="2017-03-03 19:00">March 3, 2017</time>
          </p>
        </footer>
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          This is my third Invicta Pro Diver. They are just fantastic value for
          money. This one arrived yesterday and the first thing I did was set
          the time, popped on an identical strap from another Invicta and went
          in the shower with it to test the waterproofing.... No problems.
        </p>
        <p className="mb-3 text-gray-500 dark:text-gray-400">
          It is obviously not the same build quality as those very expensive
          watches. But that is like comparing a Citroën to a Ferrari. This watch
          was well under £100! An absolute bargain.
        </p>
        <a
          href="#"
          className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          Read more
        </a>
        <aside>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            19 people found this helpful
          </p>
          <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
            <a
              href="#"
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
              Helpful
            </a>
            <a
              href="#"
              className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
              Report abuse
            </a>
          </div>
        </aside>
      </article>
    </section>
  );
}

export default CourseDetails;
