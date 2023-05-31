import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import { tutorSignin } from "../../../Services/tutorApi";

function TutorLogin() {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { data } = await tutorSignin(values);
      if (data.token) {
        toast.success(data.message);
        localStorage.setItem("tutor-token", JSON.stringify(data.token));
        navigate("/tutor/dashboard");
      } else if (data.message) {
        toast.error(data.message, {
          duration: 10000,
        });
      }
    },
  });
  return (
    <div className="bg-gray-800 max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="text-white mt-10 max-w-sm mx-auto p-3 rounded-2xl">
        {/* <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" /> */}
        <p className="font-bold text-2xl uppercase">WELCOME TO Learn-Leap</p>
        <p className="uppercase text-center font-medium mt-3">Tutor Login</p>
      </div>
      <div className="container max-w-sm mx-auto flex flex-col items-center mt-10  px-2">
        <div className="bg-white px-6 py-8 mt-0 rounded-2xl shadow-md text-black w-full">
          <form onSubmit={formik.handleSubmit}>
            <input
              type="email"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="email"
              placeholder="Email"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="form-error text-red-600">{formik.errors.email}</p>
            ) : null}

            <input
              type="password"
              className="block border border-grey-light w-full p-3 rounded mb-4"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="form-error text-red-600">
                {formik.errors.password}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
              SIGN IN
            </button>
          </form>
        </div>

        <div className="text-white mt-6">
          Don't have an account?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/tutor/signup">
            Signup
          </Link>
        </div>
        <div className="text-white mb-5">
          Sign in as a student?
          <Link
            to="/signin"
            className="no-underline border-b ml-2 border-white text-yellow">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TutorLogin;
