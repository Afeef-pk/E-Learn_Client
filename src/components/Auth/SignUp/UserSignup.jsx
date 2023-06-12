import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-hot-toast";
import { userSignup } from "../../../Services/userApi";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { verifySignup } from "../../../Services/userApi";
import { useDispatch } from "react-redux";
import { userAuthorized } from "../../../Redux/app/userSlice";
import { initialValues, validationSchema } from "../../../constants/constant";

function UserSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      toast.loading("Let's verify your email");
      const { data } = await userSignup(values.phone);
      toast.dismiss();
      if (data.otpSend) {
        navigate("/otp", { state: { ...values } });
      } else {
        toast.error("already have an account");
      }
    },
  });

  const googleAuthentication = async (res) => {
    const decoded = await jwt_decode(res.credential);
    console.log(decoded);
    const userData = {
      name: decoded.given_name,
      lastName: decoded.family_name,
      email: decoded.email,
      password: decoded.sub,
      image:decoded.picture
    };
    const { data } = await verifySignup(userData, null, true);
    if (data.token) {
      toast.success(data.message);
      dispatch(userAuthorized());
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
    // <div className="bg-[#232946] max-w-screen-2xl mx-auto min-h-screen flex flex-col">
    //   <div className="text-white mt-5 max-w-sm mx-auto p-3 rounded-2xl">
    //     {/* <img src="" className="w-20 h-20 mx-auto mb-4" alt="logo" /> */}
    //     <p className="font-bold text-2xl">WELCOME TO LEARN-LEAP</p>
    //     <p className="uppercase text-center font-medium">register to explore</p>
    //   </div>
    //   <div className="container max-w-lg  mx-auto flex flex-col items-center justify-center px-2">
    //     <div className="bg-white px-6 py-8 mt-6 rounded-2xl shadow-md text-black w-full">
    //       <form action="" onSubmit={formik.handleSubmit}>
    //         <div className="md:flex md:justify-between md:mb-4">
    //           <div className="md:w-1/2 md:pr-2">
    //             <input
    //               type="text"
    //               className="block border border-grey-light w-full p-3 rounded mb-4"
    //               name="firstName"
    //               placeholder="First Name"
    //               onChange={formik.handleChange}
    //               value={formik.values.firstName}
    //               onBlur={formik.handleBlur}
    //             />
    //             {formik.errors.firstName && formik.touched.firstName ? (
    //               <p className=" text-red-600">{formik.errors.firstName}</p>
    //             ) : null}
    //           </div>
    //           <div className="md:w-1/2 md:pr-2">
    //           <input
    //               type="text"
    //               className="block border border-grey-light w-full p-3 rounded mb-4"
    //               name="lastName"
    //               placeholder="Last Name"
    //               onChange={formik.handleChange}
    //               value={formik.values.lastName}
    //               onBlur={formik.handleBlur}
    //             />
    //             {formik.errors.lastName && formik.touched.lastName ? (
    //               <p className="form-error text-red-600">
    //                 {formik.errors.lastName}
    //               </p>
    //             ) : null}
    //           </div>
    //         </div>
    //         <div className="md:flex md:justify-between md:mb-4">
    //           <div className="md:w-1/2 md:pr-2">
    //             <input
    //               type="text"
    //               className="block border border-grey-light w-full p-3 rounded mb-4"
    //               name="phone"
    //               placeholder="Mobile Number"
    //               value={formik.values.phone}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //             />
    //             {formik.errors.phone && formik.touched.phone ? (
    //               <p className="form-error text-red-600">
    //                 {formik.errors.phone}
    //               </p>
    //             ) : null}
    //           </div>

    //           <div className="md:w-1/2 md:pr-2">
    //           <input
    //               type="email"
    //               className="block border border-grey-light w-full p-3 rounded mb-4"
    //               name="email"
    //               placeholder="Email"
    //               onChange={formik.handleChange}
    //               value={formik.values.email}
    //               onBlur={formik.handleBlur}
    //             />
    //             {formik.errors.email && formik.touched.email ? (
    //               <p className="form-error text-red-600">
    //                 {formik.errors.email}
    //               </p>
    //             ) : null}
    //           </div>
    //         </div>
    //         <div className="md:flex md:justify-between md:mb-4">
    //           <div className="md:w-1/2 md:pr-2">
    //             <input
    //               type="password"
    //               className="block border border-grey-light w-full p-3 rounded mb-4"
    //               name="password"
    //               placeholder="Password"
    //               value={formik.values.password}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //             />
    //             {formik.errors.password && formik.touched.password ? (
    //               <p className="form-error text-red-600">
    //                 {formik.errors.password}
    //               </p>
    //             ) : null}
    //           </div>
    //           <div className="md:w-1/2 md:pr-2">
    //             <input
    //               type="password"
    //               className="block border border-grey-light w-full p-3 rounded mb-4"
    //               name="confirmPassword"
    //               placeholder="Confirm Password"
    //               value={formik.values.confirmPassword}
    //               onChange={formik.handleChange}
    //               onBlur={formik.handleBlur}
    //             />
    //             {formik.errors.confirmPassword &&
    //             formik.touched.confirmPassword ? (
    //               <p className="form-error text-red-600">
    //                 {formik.errors.confirmPassword}
    //               </p>
    //             ) : null}
    //           </div>
    //         </div>

    //         <button
    //           type="submit"
    //           className="w-full bg-blue-600 text-center py-3 rounded-xl  text-white hover:bg-[#232946] focus:outline-none my-1">
    //           CREATE ACCOUNT
    //         </button>
    //       </form>
    //     </div>

    //     <div className="text-white mt-6 ">
    //       Already have an account ?
    //       <Link
    //         className="no-underline border-b ml-2 border-white text-yellow"
    //         to="/signin">
    //         Log in
    //       </Link>
    //     </div>
    //     <div className="text-white mb-5 mt-1 ">
    //       Register as a tutor ?
    //       <Link
    //         className="no-underline border-b ml-2 border-white text-yellow"
    //         to="/tutor/signup">
    //         Register
    //       </Link>
    //     </div>
    //     <GoogleLogin onSuccess={googleAuthentication} onError={googleFailed} />
    //   </div>
    // </div>

      <div className="flex justify-center bg-[#e9eef2] max-h-screen">
        <div className="my-[3rem] mx-4 py-[3rem] bg-white rounded-lg w-[440px] shadow-lg ">
          <h2 className="text-darkBlue text-center text-3xl font-bold ">
            Sign up
          </h2>
          <form
            onSubmit={formik.handleSubmit}
            className="px-[3rem]  flex flex-col mt-[2rem]">
            <label className="text-sm text-darkBlue" htmlFor="name">
              Full name
            </label>
            <input
              type="text"
              name="name"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.name}
              onBlur={formik.handleBlur}
            />
            {formik.errors.name && formik.touched.name ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.name}
              </p>
            ) : null}
            <label className="text-sm text-darkBlue mt-4" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.email}
              </p>
            ) : null}
            <label className="text-sm text-darkBlue mt-4" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.phone}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.phone}
              </p>
            ) : null}
            <label className="text-sm text-darkBlue mt-4" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3 text-darkBlue"
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <p className="form-error text-red-600 text-xs mt-2">
                {formik.errors.password}
              </p>
            ) : null}
            <div>
              <button
                type="submit"
                className="border border-darkBlue px-6 py-2 mt-5 text-darkBlue rounded font-bold hover:shadow-md">
                Sign up
              </button>
            </div>
          </form>
          <div className="ml-[3rem]">
            <p className="text-sm mt-4 mb-1 text-lightBlue">
              Already have an account?{" "}
              <Link to={"/signin"} className="cursor-pointer underline">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-lightBlue">
              Are you a Teacher{" "}
              <Link to={"/tutor/signup"} className="cursor-pointer underline">
                {" "}
                Sign up
              </Link>
            </p>
          </div>
          <div className="flex justify-center mt-3">
            <GoogleLogin
              onSuccess={googleAuthentication}
              onError={googleFailed}
            />
          </div>
        </div>
      </div>
  );
}

export default UserSignup;
