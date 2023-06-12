import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import { isCourseEnrolled } from '../../services/userApi';
//import Button from '../Button/Button';
import tutorIcon from "/icons/tutorIcon.png";
import { AiOutlineClockCircle } from "react-icons/ai";
import { ImFilm } from "react-icons/im";
import { GrLanguage } from "react-icons/Gr";

function BuyNowCard({ courseDetails }) {
  const user = useSelector((state) => state.user);
  const [isEnrolled, setIsEnrolled] = useState(false);
  // useEffect(() => {
  //   //   if(user.firstName){
  //   //       isCourseEnrolled(courseDetails._id).then((response) => {
  //   //           if (response.data.enrolled) {
  //   //               setIsEnrolled(true);
  //   //           }
  //   //       })
  //   //   }
  // }, []);
  let count = 0
  courseDetails.course.map((chapter)=>{
    return(
     
    count += chapter.lessons.length
    )
  })
  
  return (
    <div className="max-w-sm mt-8 bg-white border border-gray-200 rounded-lg w-full md:w-80 shadow  ">
      <div className="p-5">
        <img
          className="rounded w-full object-cover"
          src={courseDetails.imageURL}
          alt="course thumbnail"
        />
      </div>
      <div className="p-5 pt-2">
        
        <div className="flex justify-between ">
          <div>
            <div className="flex">
              <img src={tutorIcon} alt="" className="h-7 m-1" />
              <p className="mx-1 my-1.5">Instructor</p>
            </div>
            <div className="flex mx-2 my-2 ">
              <AiOutlineClockCircle size={20} />
              <p className="mx-3.5">Duration</p>
            </div>
            <div className="flex mx-2 my-3 ">
              <ImFilm size={20} />
              <p className="mx-3.5">Lectures</p>
            </div>
            <div className="flex mx-2 my-3 ">
              <GrLanguage size={20} />
              <p className="mx-3.5">Language</p>
            </div>
          </div>

          <div>
            <p className="my-2">{courseDetails.teacher.name}</p>
            <p className="my-3">{courseDetails.duration}</p>
            <p className="my-3">{count} Lessons</p>
            <p className="my-3">{courseDetails.language}</p>
          </div>
        </div>
       
          <h5 className="mb-2 m-2 text-2xl font-bold tracking-tight text-gray-900">
            ₹ {courseDetails.price}
          </h5>
        <p className="mb-3 font-normal text-gray-700 ">Life Long Validity</p>
        
        <div className="button">
          {isEnrolled ? //         Continue Learning //     <button width={true}> // <Link to={`/my-enrollments`}>
          //     </button>
          // </Link>
          null : (
            <Link
              className="w-full"
              to={`/course/view/${courseDetails._id}`}>
              <button className="bg-[#6255a4] p-3 text-white loading-btn form-btn mt-2 font-medium rounded w-full">
                Buy Now
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="border-t pl-5 mt-4 mb-4">
        <h4 className="font-semibold mt-3">Whats included</h4>
        {/* <p className='mt-3'>{courseDetails.course && courseDetails.course.length} Chapter </p> */}
        <p className="mt-3">Online accessibility</p>
      </div>
    </div>
  );
}

export default BuyNowCard;
