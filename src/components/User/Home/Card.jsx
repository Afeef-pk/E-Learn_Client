import React from "react";

function Card(props) {
  return (
    <div className={"p-9 rounded-md shadow-2xl"} style={{ backgroundColor: props.color }}>
      <img className="w-12" src={props.icon} alt="" />
      <h1 className="text-3xl mb-5 mt-3">{props.title}</h1>
      <p >{props.content}</p>
    </div>
  );
}

export default Card;
