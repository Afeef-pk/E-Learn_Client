import React from "react";

function Card(props) {
  return (
    <div className="p-10 " style={{ backgroundColor: props.color }}>
      <img className="w-12" src={props.icon} alt="" />
      <h1 className="text-3xl mb-3 mt-2">{props.title}</h1>
      <p>{props.content}</p>
    </div>
  );
}

export default Card;
