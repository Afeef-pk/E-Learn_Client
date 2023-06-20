import React from 'react'
import {Link} from 'react-router-dom'

function CourseCard({course,myCourse}) {
  
  return (
    <Link to={!myCourse ? `/course-details/${course._id}` : `/course/view/${course._id}`}>
    <div className='bg-[#e5e5e5a9] rounded-b-xl w-60 pb-5 transition duration-300  transform hover:scale-110 '>
      <img className='w-full rounded-t-xl' src={course?.imageURL} alt="" />
      <div className='h-10'>
      <h1 className='mx-5 mt-5 font-bold text-black'>{course?.name}</h1>
      </div>
      <h1 className='mx-5 mt-4 font-medium'>Tutor : {course?.teacher.name}</h1>
     {!myCourse && <p className='m-5 my-3 font-medium'>₹ {course?.price}</p>}
    </div>
    </Link>
  )
}

export default CourseCard
