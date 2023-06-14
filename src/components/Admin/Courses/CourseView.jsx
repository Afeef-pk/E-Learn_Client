import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import { getCourseDetails } from "../../../Services/adminApi";
import SyllabusDropdown from "../../User/Course/SyllabusDropdown/SyllabusDropdown";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import { deleteCourse } from "../../../Services/tutorApi";
import { toast } from "react-hot-toast";

function CourseView({ tutor }) {
  const location = useLocation();
  const navigate = useNavigate();
  const courseId = location.state;
  const [course, setCourse] = useState(null);
  const [videoId, setVideoId] = useState();
  const [playerHeight, setPlayerHeight] = useState("");
  const opts = {
    height: playerHeight,
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleApprove = (status) => {
    getCourseDetails(courseId, status).then((response) => {
      navigate("/admin/courses");
    });
  };

  const getYoutubeVideoId = (videoUrl) => {
    setVideoId(getYouTubeID(videoUrl));
  };

  useEffect(() => {
    getCourseDetails(courseId).then((response) => {
      response.data.course.course = response.data.course.course.map((obj) => {
        return { ...obj, open: false };
      });
      setCourse(response.data.course);
    });

    function handleResize() {
      const windowWidth = window.innerWidth;
      if (windowWidth >= 1080) {
        setPlayerHeight("380");
      } else if (windowWidth >= 720) {
        setPlayerHeight("240");
      } else {
        setPlayerHeight("240");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (index) => {
    let cours = course.course.map((course, i) => {
      if (i === index) {
        course.open = !course.open;
      } else {
        course.open = false;
      }
      return course;
    });
    setCourse({ ...course, cours });
  };

  const handleDelete =()=>{
    try {
      deleteCourse(courseId).then(({data})=>{
        toast.success(data.message)
        navigate('/tutor/dashboard')
      }).catch(()=>{
        toast.error(data.message)
      })
    } catch (error) {
      
    }
  }
  return (
    <>
      <div className="h-auto w-full bg-[#141B2D] text-white">
        <NavBar />
        <h1 className="text-3xl mx-5 uppercase  text-white font-bold tracking-widest">
          Courses
        </h1>

        <div className="h-auto  rounded-lg m-10 bg-[#1F2A40] pb-5 p-8">
          <div className="mx-10 grid grid-cols-2 gap-10 mb-10">
            <div>
              {videoId ? (
                <div>
                  <YouTube videoId={videoId} opts={opts} />
                </div>
              ) : (
                <div
                  onClick={() => {
                    getYoutubeVideoId(course.course[0].lessons[0].videoUrl);
                  }}
                  className="cursor-pointer relative flex justify-center items-center ">
                  <div className="absolute text-white ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="fill"
                      viewBox="0 0 24 24"
                      strokeWidth={1}
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
                  <img
                    className="w-full"
                    src={course && course.imageURL}
                    alt=""
                  />
                </div>
              )}
            </div>
            <div className="bg-white  rounded-lg">
              <div className="syllabus syllabus-wrap rounded-lg text-black mt-2">
                {course?.course.map((course, index) => (
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

          <div className=" mx-10  bg-[#141B2D] rounded-md">
            <p className="text-xl p-5">
              Tittle : <span className="px-5">{course?.name}</span>
            </p>
            <p className="text-xl p-5">
              About : <span className="px-5">{course?.about}</span>
            </p>
            <p className="text-xl p-5 ">
              Duration : <span className="px-5">{course?.duration}</span>
            </p>
            <p className="text-xl p-5">
              Language : <span className="px-5">{course?.language}</span>
            </p>
            <p className="text-xl p-5">
              Category : <span className="px-5">{course?.category?.name}</span>
            </p>
            <p className="text-xl p-5">
              Description : <span className="px-5">{course?.description}</span>
            </p>
            <p className="text-xl p-5">
              Price : <span className="px-5">{course?.price}</span>
            </p>
            <div className="flex justify-end mx-32 pb-10">
              {!course?.isApproved && !tutor&&(
                <>
                  <button
                    onClick={() => handleApprove(false)}
                    className="bg-red-500 px-7 py-2 rounded-xl  text-center  text-white focus:outline-none my-1">
                    Reject
                  </button>
                  <button
                    onClick={() => handleApprove(true)}
                    className="bg-green-500 px-7 py-2 rounded-xl mx-5 text-center  text-white  focus:outline-none my-1">
                    Approve
                  </button>
                </>
              )}

              {tutor && (
                <>
                  <button className="bg-red-500 px-7 py-2 rounded-xl  text-center  text-white focus:outline-none my-1" onClick={handleDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-green-500 px-7 py-2 rounded-xl mx-5 text-center  text-white  focus:outline-none my-1">
                    Edit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseView;
