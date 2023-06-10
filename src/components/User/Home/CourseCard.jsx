import React from 'react'
import {Link} from 'react-router-dom'

function CourseCard({course}) {
  return (
    <Link to={`/course-details/${course._id}`}>
    <div className='bg-gray-200 rounded-b-xl w-60 pb-2'>
      <img className='w-full rounded-t-xl' src={course?.imageURL} alt="" />
      <h1 className='mx-5 mt-5 font-bold'>{course?.name}</h1>
      <h1 className='mx-5 mt-3 font-medium'>Tutor : {course?.teacher.name}</h1>
      <p className='m-5 my-3 font-medium'>₹ {course?.price}</p>
    </div>
    </Link>
  )
}

export default CourseCard
