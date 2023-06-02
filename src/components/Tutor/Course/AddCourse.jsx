import React, { useState, useRef } from "react";
import NavBar from "../NavBar/NavBar";

function AddCourse() {
  const fileInputRef = useRef();
  const [image, setImage] = useState("");
  const handleClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="h-auto w-full bg-[#141B2D] text-white">
      <NavBar />
      <div className="bg-[#1F2A40] m-10 rounded-lg">
        <div className=" flex justify-center py-5">
          {image && (
            <div className="flex  justify-center ">
              <img
                class="h-48 max-w-xs rounded-lg w-full "
                src={image ? URL.createObjectURL(image) : ""}
                alt="image description"
                onClick={handleClick}></img>
            </div>
          )}
          <div
            className={
              !image
                ? "flex   items-center justify-center  "
                : "items-center justify-center  hidden"
            }>
            <div className="">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center   max-w-sm w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                  </svg>
                  <p>Course thumbnail</p>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  required
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
              </label>
            </div>
          </div>
        </div>

        <div>
          <form>
            <div className="flex flex-wrap mx-10 my-3 text-white gap-5">
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="name">
                  Name
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Course   Name"
                />
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="name">
                  Name
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Course   Name"
                />
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="name">
                  Duration
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Course Duration"
                />
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="name">
                  Language
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Course Language"
                />
              </div>

              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="name">
                  Price
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Course Price"
                />
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="name">
                  Price
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="name"
                  placeholder="Course Price"
                />
              </div>

              <div className='mb-4 w-96'>
                    <label className="block uppercase tracking-wide text-xs font-bold mb-2" htmlfor="description">
                        Description
                    </label>

                    <textarea id="description" rows="5" name='description' className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."
                      
                    />
                </div>
            </div>
            
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
