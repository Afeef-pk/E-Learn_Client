import React from 'react'

function CourseCard(props) {
  return (
    <div className='bg-gray-200 rounded-b-xl'>
      <img className='w-full rounded-t-xl' src={props.image} alt="" />
      <h1 className='mx-5 mt-5 font-medium'>{props.title}</h1>
      <h1 className='mx-5 mt-3 font-medium'>Tutor : {props.tutor}</h1>
      <p className='mx-5 mb-5 font-medium'>₹ {props.price}</p>
    </div>
  )
}

export default CourseCard
