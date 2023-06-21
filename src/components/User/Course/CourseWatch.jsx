import React, { useState, useEffect } from "react";
import SyllabusDropdown from "./SyllabusDropdown/SyllabusDropdown";
import YouTube from "react-youtube";
import { useDispatch, useSelector } from "react-redux";
import getYouTubeID from "get-youtube-id";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getCourseWatch } from "../../../Services/userApi";
import { setCourseDetails } from "../../../Redux/app/courseSlice";

function CourseWatch() {
  const dispatch = useDispatch();
  const [playerHeight, setPlayerHeight] = useState("");
  const courseDetails = useSelector((state) => state.course.value);
  const [videoId, setVideoId] = useState();
  const { courseId } = useParams()
  const navigate = useNavigate();
console.log(courseDetails);
  const toggleDropdown = (index) => {
    let course = courseDetails.course.map((course, i) => {
      if (i === index) {
        return {
          ...course,
          open: !course.open,
        };
      } else {
        return {
          ...course,
          open: false,
        };
      }
    });
    dispatch(setCourseDetails({ ...courseDetails, course }));
  };

  //youtube window opts
  const opts = {
    height: playerHeight,
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  //youtube video id generator
  const getYoutubeVideoId = (videoUrl) => {
    console.log(videoUrl);
    setVideoId(videoUrl); 
  };

  useEffect(() => {
    window.scrollTo(0, 0);  
    if (!courseDetails) {
        getCourseWatch(courseId)
        .then((response) => {
            const course = response.data.courseDetails.course.map(obj => {
                return { ...obj, open: false };
            });
            dispatch(setCourseDetails({ ...response.data.courseDetails, course }))
        })
        .catch((error)=>{
            toast.error(error.response.data.err)
            navigate('/')
        })
    }

    //seting first video  to video controller
    if (courseDetails) {
      getYoutubeVideoId(courseDetails?.course[0].lessons[0].videoUrl);
    }
    //screen resize
    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1080) {
        setPlayerHeight("589");
      } else if (windowWidth >= 720) {
        setPlayerHeight("380");
      } else {
        setPlayerHeight("240");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
console.log(videoId);
  return (
    <section>
      <div className="mx-auto  h-screen">
        <div className="flex flex-col sm:flex-row  ">
          <div className="w-full lg:w-8/12 overflow-auto">
            <div className="flex text-slate-700 items-center py-4 pl-2 border-b border-slate-300">
              <Link to={`/course-details/${courseId}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5">
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>

              <h1 className="ml-3 text-md ">
              {courseDetails && courseDetails.name}
              </h1>
            </div>

            <div>
              {videoId ? (
                <div>
                  {/* <YouTube videoId={videoId} opts={opts} /> */}
                  <video width="100%" height="589" controls>
                    <source
                      src={videoId}
                      type={videoId.type}
                    />
                  </video>
                </div>
              ) : (
                <div
                  onClick={() => {
                    getYoutubeVideoId(
                      courseDetails.course[0].lessons[0].videoUrl
                    );
                  }}
                  className="cursor-pointer relative flex justify-center items-center h-96">
                  <div className="absolute text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                      />
                    </svg>
                  </div>
                  <img className="h-full" src={courseDetails&& courseDetails.imageURL} alt="" />
                </div>
              )}

              <div className="course-info-wrap p-5">
                {/* //author section */}

                <div>
                  <h3 className="text-2xl  mt-8 font-semibold mb-4 ">Author</h3>
                  <blockquote className="rounded-lg bg-gray-100 p-8">
                    <div className="flex items-center gap-4">
                      <img
                        alt="Man"
                        src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                        className="h-16 w-16 rounded-full object-cover"
                      />

                      <div>
                        <p className="mt-1 text-lg font-medium text-gray-700">
                          {courseDetails && courseDetails?.teacher?.name}
                        </p>
                      </div>
                    </div>

                    <p className="line-clamp-2 sm:line-clamp-none mt-4 text-gray-500">
                      {courseDetails && courseDetails.teacher?.about}
                    </p>
                  </blockquote>
                </div>

                {/* //about section */}

                <div>
                  <h3 className="text-2xl  mt-8 font-semibold mb-4 ">About</h3>
                  <div className="border rounded-md p-3 ">
                    <p className="text-slate-600 mt-4">
                      {courseDetails && courseDetails.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-4/12 border-l border-slate-300  items-center  sm:h-screen top-0 sm:sticky overflow-auto ">
            <div>
              <div className="border-b border-slate-300 p-3 w-full relative z-50 bg-white">
                <h3 className="text-2xl  font-semibold tracking-wider">
                  Syllabus
                </h3>
              </div>
              <div>
                <div className="">
                  <div className="syllabus syllabus-wrap    rounded-lg">
                    {courseDetails &&
                      courseDetails.course?.map((course, index) => (
                        <SyllabusDropdown
                          course={course}
                          index={index}
                          key={index}
                          toggleDropdown={toggleDropdown}
                          getYoutubeVideoId={getYoutubeVideoId}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseWatch;
