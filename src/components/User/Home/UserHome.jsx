import React, { useEffect,useState } from "react";
import { toast, Toaster } from "react-hot-toast"
import { Link } from "react-router-dom";
import logo1 from "/icons/design.svg";
import logo2 from "/icons/monitor.svg";
import logo3 from "/icons/it-logo.svg";
import logo4 from "/icons/business-logo.svg";
import Card from "./Card";
import CourseCard from "./CourseCard";
import homekid from "/assets/home-kid.png";
import homeImg from "/assets/home-image.png";
import { homeCourseLoad } from "../../../Services/userApi";
import Button from "../Button/Button";

function UserHomePage() {
  const [courses,setCourse] = useState([])
   useEffect(()=>{
    homeCourseLoad().then((res)=>{
      setCourse(res.data.courseData);
    })
  },[])
  return (
    <>
      <div className="grid  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 h-auto bg-[#EAEDFB] ">
        <div className="w-full">
          <div className="flex justify-center items-center">
            <h3 className="text-3xl text-center md:text-1xl lg:text-3xl xl:text-3xl xl:py-20 py-8 px-10 font-semibold leading-10">
              Welcome to the World of Lifelong Learning !
            </h3>
          </div>
          <div>
            <h6 className="leading-8 pl-16  pr-8 text-xl  text-gray-800 font-semibold xl:pl-24 xl:pr-10">
              Learn the skills you need to take the next step and every step
              after. Pick from over 100 online video courses with new additions
              published every month.
            </h6>
          </div>

          <div className="xl:pl-24 pl-16 pt-5  ">
            <Link to="/course">
              <Button className="bg-[#232946] hover:bg-[#334364] text-white font-medium py-2 px-4 rounded">
                Explore courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="">
          <img className="" src={homeImg} alt="home-pic" />
        </div>
      </div>

      <div className="">
        <div className="grid justify-items-center m-5">
          <div>
            <h4 className="font-bold text-3xl  p-3 text-center">
              Choose favourite course from top category
            </h4>
          </div>
          <div className="p-3">
            <Link to="/course"><Button className="bg-[#232946] hover:bg-[#232946] text-white  py-2 px-4 rounded ">
              See All category
            </Button></Link>
          </div>
        </div>

        <div className="px-10 mt-6 mb-10 gap-10 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
          <Card
            icon={logo1}
            title={"Design"}
            color={"#EFEFF6"}
            hoverColor={"#0d6efd"}
            content={
              "Learn how to design your website. We have a wide range of designing courses from which you can select the best that suits you."
            }
          />
          <Card
            icon={logo2}
            title={"Development"}
            color={"#F68C201A"}
            content={
              "Learn how to develop your software and websites. We provide you with a wide range of different development courses that will help you to learn more."
            }
          />
          <Card
            icon={logo3}
            title={"IT & Software"}
            color={"#BBF0FF80"}
            content={
              "If you want to learn something new in IT and Software, then this is the right place to help you with different IT and Software courses from which you can get the one for you."
            }
          />
          <Card
            icon={logo4}
            title={"Bussiness"}
            color={"#CEF6D680"}
            content={
              "If you want to be a successful business owner, our courses will help you do so. Book your course now."
            }
          />
        </div>
      </div>
      <div>
        <div>
          <h5 className="font-semibold font-outfit text-center uppercase text-3xl">
            Choose your course
          </h5>
        </div>
        <div className="mt-5">
          <h5 className="font-semibold text-center uppercase text-2xl">
            We Have Tones of Course for You !!
          </h5>
        </div>
        <h1 className="m-5 ml-16 font-semibold text-3xl  max-sm:ml-24">Top Courses</h1>
        <div className="items-center justify-center  mt-7 m-16 max-sm:m-0 mb-8  grid  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5">
          {courses.map((course,index)=>{
          return <CourseCard
          key={index}
          course={course}
          /> })}
        </div>
        <div className=" grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 bg-[#F2FFF7] my-20" >
          <div className="w-full">
            <div className="max-sm:px-12 max-sm:pt-10 px-20 pt-10 ">
              <h3 className="text-5xl font-medium leading-tight">
                Platform for Connect and build your career
              </h3>
            </div>
            <div className="max-sm:px-12 px-20 mt-7 font-normal font-outfit">
              <h1 className="text-lg">
                We want our users to be able to communicate with Tutors through
                our platform. Embrace collaboration, connect with others, and
                code. A simple glance at your showcased projects will connect
                you directly with startups and top-notch companies.
              </h1>
            </div>
            <div className="max-sm:px-12 px-20 mt-5">
              <Button className="bg-[#232946] hover:bg-[#232946] text-white mb-5 py-2 px-4 rounded">Connect</Button>
            </div>
          </div>
          <div className="grid justify-items-center max-sm:hidden">
            <img src={homekid} className="w-96 " alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
