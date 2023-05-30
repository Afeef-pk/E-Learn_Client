import React from 'react'

function CourseCard(props) {
  return (
    <div className=''>
      <img className='w-full rounded-xl' src={props.image} alt="" />
      <h1 className='mt-5'>{props.title}</h1>
      <h1>By : {props.tutor}</h1>
      <p>₹ {props.price}</p>
    </div>
  )
}

export default CourseCard
