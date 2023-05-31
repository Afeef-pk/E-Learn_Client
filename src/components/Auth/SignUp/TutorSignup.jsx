import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { auth } from "../../../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

import { signupApi } from "../../../Services/tutorApi";

function TutorSignup() {
  const [user, setUser] = useState(null);
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    profession: "",
    password: "",
    confirmPassword: "",
    otp: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().min(2).max(25).required("Please enter your name"),
    email: Yup.string().email().required("Please enter your email"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number is not valid")
      .required("Please enter your phone"),
    profession: Yup.string().required("Please select a topic"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const sendOtp = async () => {
    try {
      const number = "+91" + formik.values.phone;
      let recaptcha = new RecaptchaVerifier(
        "sign-in-button",
        {
          size: "invisible",
        },
        auth
      );
      const confirmation = await signInWithPhoneNumber(auth, number, recaptcha);
      setUser(confirmation);
      setShowButton(false);
    } catch (error) {
      console.log(error);
    }
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { data } = await signupApi(values)
      if (data.message) {
        toast.error(data.message);
      } else if (data.sendOtp) {
        sendOtp();
      }
    },
  });

  const verifyOtp = async () => {
    try {
      const verify = await user.confirm(formik.values.otp);
      if (verify) {
        const { data } = await signupApi(formik.values)
        if (data.signed) {
          navigate("/tutor/dashboard");
        }
      }
    } catch (error) {
      toast.error("invalid otp");
    }
  };
  return (
    <div className="bg-gray-800 max-w-screen-2xl mx-auto min-h-screen flex flex-col">
      <div id="sign-in-button"></div>
      <div className="text-white mt-5 max-w-sm mx-auto p-3 rounded-2xl">
        {/* <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" /> */}
        <p className="font-bold text-2xl">WELCOME TO LEARN-LEAP</p>
        <p className="uppercase text-center font-medium">Register as a tutor</p>
      </div>
      <div className="container max-w-lg  mx-auto flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 mt-6 rounded-2xl shadow-md text-black w-full">
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="md:flex md:justify-between md:mb-4">
              <div className="md:w-1/2 md:pr-2">
                <input
                  type="text"
                  className="block border border-grey-light w-full p-3 rounded mb-4"
                  name="name"
                  placeholder="Name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="form-error text-red-600">
                    {formik.errors.name}
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
                <select
                  name="profession"
                  onChange={formik.handleChange}
                  value={formik.values.profession}
                  onBlur={formik.handleBlur}
                  className="block border border-grey-light w-full p-3 rounded mb-4">
                  <option disabled value="">
                    Select Your Profession
                  </option>
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
                </select>
                {formik.errors.profession && formik.touched.profession ? (
                  <p className="form-error text-red-600">
                    {formik.errors.profession}
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
            {!showButton && (
              <div className="md:flex md:justify-between md:mb-4">
                <div className="md:w-1/2 md:pr-2">
                  <input
                    type="text"
                    className="block border border-grey-light w-full p-3 rounded mb-4"
                    name="otp"
                    placeholder="Please Enter Otp"
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {/* <div className="md:w-1/2 md:pr-2 mt-2">
                <Button variant="contained" color="secondary" onClick={verifyOtp}>Verify</Button>
              </div> */}
              </div>
            )}

            {showButton && (
               <button
               type="submit"
               className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
               CREATE ACCOUNT 
             </button>
            )}
            {!showButton && (
              <button
                onClick={verifyOtp}
                className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
                Verify & signup
              </button>
            )}
          </form>
        </div>

        <div className="text-white mt-6 ">
          Already have an account ?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/tutor">
            Log in
          </Link>
        </div>
        <div className="text-white mb-5 mt-1 ">
          Register as a Student ?
          <Link
            className="no-underline border-b ml-2 border-white text-yellow"
            to="/signup">
            Register
          </Link>
          <Toaster />
        </div>
      </div>
    </div>
  );
}

export default TutorSignup;
