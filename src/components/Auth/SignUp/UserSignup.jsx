import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, Toaster } from "react-hot-toast";
import { userSignup } from "../../../Services/userApi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { verifySignup } from "../../../Services/userApi";

function UserSignup() {
  const navigate = useNavigate();
  const initialValues = {
    firstName: "",
    lastName:"",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().matches(/^[a-zA-Z ]*$/,'Name must be a letter').min(2).max(25).required("Please enter your name"),
    lastName: Yup.string().min(1).max(25).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number is not valid")
      .required("Please enter your phone"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      toast.loading("Let's verify your email");
      const {data} = await userSignup(values.phone) 
      toast.dismiss();
      if (data.otpSend) {
        navigate("/otp",{ state: { ...values } });
      } else {
        toast.error('already have an account');
      }
    }
  })

  const googleAuthentication = async (res) => {
    const decoded = await jwt_decode(res.credential);
    console.log(decoded);
    const userData = {
      firstName: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
      password:decoded.sub
    }
    const { data } = await verifySignup(userData, null,true);
      if (data.verified) {
        toast.success("otp verified");
        navigate("/signin");
      } else {
        toast.error("invalid Otp");
      }
  };
  const googleFailed = (error) => {
    console.log(error);
  };
  return (
    <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <div className="text-white mt-5 max-w-sm mx-auto p-3 rounded-2xl">
        {/* <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" /> */}
        <p className="font-bold text-2xl">WELCOME TO LEARN-LEAP</p>
        <p className="uppercase text-center font-medium">register to explore</p>
      </div>
      <div className="container max-w-lg  mx-auto flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 mt-6 rounded-2xl shadow-md text-black w-full">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="firstName"
                  placeholder="First Name"
                  onChange={formik.handleChange}
                  value={formik.values.firstName}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.firstName && formik.touched.firstName ? (
                  <p className=" text-red-600">{formik.errors.firstName}</p>
                ) : null}
              </div>
              <div className="md:w-1/2 md:pr-2">
              <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={formik.handleChange}
                  value={formik.values.lastName}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.lastName && formik.touched.lastName ? (
                  <p className="form-error text-red-600">
                    {formik.errors.lastName}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="phone"
                  placeholder="Mobile Number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <p className="form-error text-red-600">
                    {formik.errors.phone}
                  </p>
                ) : null}
              </div>

              <div className="md:w-1/2 md:pr-2">
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
                  <p className="form-error text-red-600">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="form-error text-red-600">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="password"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.confirmPassword &&
                formik.touched.confirmPassword ? (
                  <p className="form-error text-red-600">
                    {formik.errors.confirmPassword}
                  </p>
                ) : null}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
              CREATE ACCOUNT
            </button>
          </form>
        </div>

        <div className="text-white mt-6 ">
          Already have an account ?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/signin">
            Log in
          </Link>
        </div>
        <div className="text-white mb-5 mt-1 ">
          Register as a tutor ?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/tutor/signup">
            Register
          </Link>
        </div>
        <GoogleLogin onSuccess={googleAuthentication} onError={googleFailed} />
      </div>
    </div>
  );
}

export default UserSignup;
