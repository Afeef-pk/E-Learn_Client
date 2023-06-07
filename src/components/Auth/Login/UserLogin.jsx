import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userAuthorized } from "../../../Redux/app/userSlice";
import { userLogin, verifySignup } from "../../../Services/userApi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

function UserLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      const { data } = await userLogin(values);
      if (data.token) {
        toast.success(data.message);
        dispatch(userAuthorized());
        localStorage.setItem("token", data.token);
        navigate("/");
      } else if (data.message) {
        toast.error(data.message);
      }
    },
  });

  const googleAuthentication = async (res) => {
    const decoded = await jwt_decode(res.credential);
    const userData = {
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
      password:decoded.sub
    }
    const { data } = await verifySignup(userData, null,true);
    if (data.token) {
      toast.success(data.message)
      dispatch(userAuthorized())
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      toast.error("there was an error signing up");
    }
  };
  const googleFailed = (error) => {
    console.log(error);
  };
  return (
    <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
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

            <button
              type="submit"
              className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
              SIGN IN
            </button>
          </form>
        </div>

        <div className="text-white mt-6">
          Don't have an account ?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/signup">
            Signup
          </Link>
        </div>
        <div className="text-white mb-5">
          Sign in as a tutor ?
          <Link
            to="/tutor"
            className="no-underline border-b ml-2 border-white text-yellow">
            Sign in
          </Link>
        </div>
        <GoogleLogin onSuccess={googleAuthentication} onError={googleFailed} />
      </div>
    </div>
  );
}

export default UserLogin;
