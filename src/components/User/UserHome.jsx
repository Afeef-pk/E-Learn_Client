import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import logo1 from "/icons/design.svg";
import logo2 from "/icons/monitor.svg";
import logo3 from "/icons/it-logo.svg";
import logo4 from "/icons/business-logo.svg";
import Card from "./Card";
import CourseCard from "./CourseCard";
import courseImage1 from "../../assets/course/js.webp";
import courseImage2 from "../../assets/course/photoshop.webp";
import courseImage3 from "../../assets/course/react.jpg";
import homepic from "/kid.png"

function UserHomePage() {
  return (
    <>
      <div className="flex h-auto">
        <div className="w-1/2 bg-gray-200 ">
          <div>
            <Typography
              variant="h3"
              className="mc-auto pt-14 pl-20 pr-10 font-bold">
              Welcome to the World of Lifelong Learning !
            </Typography>
          </div>
          <div>
            <Typography variant="h6" className="pl-20 pr-10 pt-10">
              Learn the skills you need to take the next step and every step
              after. Pick from over 100 online video courses with new additions
              published every month.
            </Typography>
          </div>
          <div className="pl-20 mt-5 ">
            <Link to="/course">
              <Button variant="contained" color="info">
                Explore courses
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-1/2 bg-amber-200">
          <img
            className="h-full w-full"
            src="https://media.istockphoto.com/id/1218524115/vector/student-following-online-courses-on-her-computer-at-home.jpg?s=612x612&w=0&k=20&c=qTqq5Ufq1Lycli_o5K63L73OaV1uJ0C-RJi0c2OgcSo="
            alt=""
          />
        </div>
      </div>
      <div className="">
        <div className="flex ml-80 mt-12  item-center justify-between w-[60%] text-center ">
          <Typography
            variant="h4"
            className="font-extrabold"
            fontFamily={"sans-serif"}
            fontWeight={700}>
            Choose favourite course from top category
          </Typography>
          <Button variant="contained" color="info">
            See All category
          </Button>
        </div>

        <div className="ml-28 mr-28 mt-10 mb-10 gap-10 grid sm:grid-cols-1 xl:grid-cols-4 md:grid-cols-2 lg:grid-cols-3">
          <Card
            icon={logo1}
            title={"Design"}
            color={"#EFEFF6"}
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
          <Typography
            variant="h5"
            className="font-extrabold text-center uppercase"
            fontFamily={"sans-serif"}
            fontWeight={700}>
            Choose your course
          </Typography>
        </div>
        <div className="mt-5">
          <Typography
            variant="h5"
            className="font-extrabold text-center uppercase"
            fontFamily={"sans-serif"}
            fontWeight={700}>
            We Have Tones of Course for You!!
          </Typography>
        </div>
        <h1 className="mt-5 ml-32 font-semibold text-2xl  ">Top Courses</h1>
        <div className="ml-28 mt-5 grid gap-10 mr-20 sm:grid-cols-1 xl:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          <CourseCard
            title={"The complete Js course For web Development"}
            image={courseImage1}
            tutor={"Jhon"}
            price={"1999"}
          />
          <CourseCard
            title={"The complete Js course For web Development"}
            image={courseImage2}
            tutor={"Jhon"}
            price={"1999"}
          />
          <CourseCard
            title={"The complete Js course For web Development"}
            image={courseImage3}
            tutor={"Jhon"}
            price={"1999"}
          />
        </div>
        <div className="mt-6 flex" style={{backgroundColor:'#d8e8de'}}>
          <div className="w-1/2">
            <div className="px-20 pt-10">
              <Typography
                variant="h3"
                fontFamily={"sans-serif"}
                fontWeight={700}>
                Platform for Connect and build your career
              </Typography>
            </div>
            <div className="px-20 mt-10">
              <Typography>
                We want our users to be able to communicate with Tutors through
                our platform. Embrace collaboration, connect with others, and
                code. A simple glance at your showcased projects will connect
                you directly with startups and top-notch companies.
              </Typography>
            </div>
            <div className="px-20 mt-5">
              <Button variant="contained">Connect</Button>
            </div>
          </div>
          <div className="w-1/2">
            <img src={homepic} className="w-full h-96" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHomePage;
