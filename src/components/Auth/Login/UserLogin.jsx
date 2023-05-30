import React from "react";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userAuthorized } from "../../../Redux/app/userSlice";
import { userLogin } from "../../../Services/userApi";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch= useDispatch()
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
      const {data} = await userLogin(values)
        if (data.token) {
          toast.success(data.message,{duration:5000});
          dispatch(userAuthorized({token:data.token}))
          localStorage.setItem("token", data.token);
          navigate("/");
        } else if (data.message) {
          toast.error(data.message,{
            duration:5000
          });
        }
    }
  })
  
  return (
    <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="text-white mt-10 max-w-sm mx-auto p-3 rounded-2xl">
        {/* <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" /> */}
        <p className="font-bold text-2xl uppercase">WELCOME TO Learn-Leap</p>
        <p className="uppercase text-center font-medium mt-3">
          sign in to continue
        </p>
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

            <Button
              variant="contained"
              type="submit"
              className="w-full text-center py-3 rounded-full  text-white hover:bg-green-300 focus:outline-none my-1">
              SIGN IN
            </Button>
          </form>
        </div>

        <div className="text-white mt-6">
          Don't have an account?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/signup">
            Signup
          </Link>
        </div>
        <div className="text-white mb-5">
          Sign in as a tutor?
          <Link
            to="/tutor"
            className="no-underline border-b ml-2 border-white text-yellow">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
