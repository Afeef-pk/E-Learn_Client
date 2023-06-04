import React, { useState, useRef } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadCourse } from "../../../Services/tutorApi";

function AddCourse() {
  const fileInputRef = useRef();
  const [image, setImage] = useState("");
  const handleClick = () => {
    fileInputRef.current.click();
  };

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    about: "",
    duration: "",
    language: "",
    price: "",
    description: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().min(4).max(25).required("Please enter Course name"),
    about: Yup.string().min(5).max(25).required("enter short description"),
    duration: Yup.string().required("Please enter course duration"),
    language: Yup.string().required("Please enter course language"),
    price: Yup.number().required("Please enter course price"),
    description: Yup.string().required("Write description about the course"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const {data} = await uploadCourse(values)
    },
  });

  return (
    <div className="h-auto w-full bg-[#141B2D] text-white">
      <NavBar />
      <div className="bg-[#1F2A40] m-10 rounded-lg">
        <div className=" flex justify-center py-5 ">
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
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="form-error text-[#ff1313] font-mono">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="about">
                  About
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="about"
                  placeholder="write a short description"
                  onChange={formik.handleChange}
                  value={formik.values.about}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.about && formik.touched.about ? (
                  <p className="form-error text-[#ff1313] font-mono">
                    {formik.errors.about}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="duration">
                  Duration
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="duration"
                  placeholder="Course Duration"
                  onChange={formik.handleChange}
                  value={formik.values.duration}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.duration && formik.touched.duration ? (
                  <p className="form-error text-[#ff1313] font-mono">
                    {formik.errors.duration}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="language">
                  Language
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="language"
                  placeholder="Course Language"
                  onChange={formik.handleChange}
                  value={formik.values.language}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.language && formik.touched.language ? (
                  <p className="form-error text-[#ff1313] font-mono">
                    {formik.errors.language}
                  </p>
                ) : null}
              </div>

              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="price">
                  Price
                </label>
                <input
                  className="border-gray-300  appearance-none block w-full bg-white text-black border  rounded py-3 
                        px-4 my-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  name="price"
                  placeholder="Course Price"
                  onChange={formik.handleChange}
                  value={formik.values.price}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.price && formik.touched.price ? (
                  <p className="form-error text-[#ff1313] font-mono">
                    {formik.errors.price}
                  </p>
                ) : null}
              </div>
              <div className="w-full md:w-2/6   md:mb-0">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="category">
                  Category
                </label>
                <select
                  name="category"
                  className="block border text-black border-grey-light w-full p-3 rounded mb-4">
                  <option value="">Select Category</option>
                  <option
                    value="Software Development"
                    className="block border border-grey-light w-full p-3 rounded mb-4">
                    Software Development
                  </option>
                  <option
                    value="Data & Analytics"
                    className="block border border-grey-light w-full p-3 rounded mb-4">
                    Data & Analytics
                  </option>
                  <option
                    value="Design"
                    className="block border border-grey-light w-full p-3 rounded mb-4">
                    Design
                  </option>
                  <option
                    value="Finance & Accounting"
                    className="block border border-grey-light w-full p-3 rounded mb-4">
                    Finance & Accounting
                  </option>
                  <option
                    value="Marketing"
                    className="block border border-grey-light w-full p-3 rounded mb-4">
                    Marketing
                  </option>
                  <option
                    value="other"
                    className="block border border-grey-light w-full p-3 rounded mb-4">
                    Other
                  </option>
                </select>
              </div>

              <div className="mb-4 w-96">
                <label
                  className="block uppercase tracking-wide text-xs font-bold mb-2"
                  htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="5"
                  name="description"
                  className="block p-3 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description ? (
                  <p className="form-error text-[#ff1313] font-mono">
                    {formik.errors.description}
                  </p>
                ) : null}
              </div>
            </div>
            <button className="bg-blue-700 rounded-2xl mx-10 mb-5 px-3 py-3">Submit Course</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
