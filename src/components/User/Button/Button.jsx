import React from "react";

function Button(props) {
  const buttonType = props.type === "submit" ? "submit" : "button";
  return (
    <button
      type={buttonType}
      className="loading-btn hover:bg-[#232946]  mt-2 font-medium rounded"
      onClick={props.onClick}>
      <span className="txt">{props.children}</span>
    </button>
  );
}

export default Button;
