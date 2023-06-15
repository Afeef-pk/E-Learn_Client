import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCourseView, paymentGateway } from "../../../Services/userApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingButton from "../LoadingButton/LoadingButton";

function OrderSummary() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [btnloading, setBtnLoading] = useState(false);

  const validate = Yup.object({
    address: Yup.string()
      .max(30, "Must be 30 characters or less")
      .required("Address is Required"),
    pincode: Yup.number()
      .min(6, "Must be 6 characters")
      .required("Pincode is Required"),
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      pincode: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {
      setBtnLoading(true);
      paymentGateway(courseDetails._id).then(({ data }) => {
        if (data.url) {
          window.location.href = data.url;
        }
      });
    },
  });

  useEffect(() => {
    getCourseView(courseId)
      .then((response) => {
          setCourseDetails(response.data.courseDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    formik.setValues((prev) => {
      const formFields = { ...prev };
      formFields[event.target.name] = event.target.value;
      return formFields;
    });
  };

  return (
    <section>
      <div className="lg:px-20 mt-5 mx-auto mb-14">
        <h3 className="text-4xl  mt-8  mb-4 ml-5 ">Order Summary</h3>

        <div className="flex flex-col lg:flex-row mt-8 ">
          <div className="w-full lg:w-8/12">
            <div className="flex justify-center sm:mx-10 m-3">
              <a
                href="#"
                className="flex w-full flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 ">
                <img
                  className="object-cover m-8 lg:m-4  ml-4 rounded h-40 md:96 md:h-auto w-100 md:w-48"
                  src={courseDetails.imageURL}
                />
                <div className="flex flex-col w-full ml-6 sm:ml-0 justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                    {courseDetails.name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {courseDetails.course?.length} Chapter
                  </p>
                </div>
              </a>
            </div>

            <div className="mt-14 mx-6">
              <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 ">
                Add Addresses
              </h5>
              <p className="mb-3 text-sm text-gray-700 dark:text-gray-400">
                Please enter addresses to proceed to payment
              </p>

              <div className="mt-8">
                <form>
                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900 ">
                      Address Line 1
                    </label>
                    <input
                      onChange={() => {
                        handleChange(event);
                      }}
                      value={formik.values.address}
                      type="text"
                      name="address"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Address"
                      required
                    />

                    {formik.touched.address && formik.errors.address ? (
                      <div className="text-red-500 mt-1">
                        {formik.errors.address}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="pincode"
                      className="block mb-2 text-sm font-medium text-gray-900 ">
                      Pin Code
                    </label>
                    <input
                      onChange={() => {
                        handleChange(event);
                      }}
                      value={formik.values.pincode}
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Pin Code"
                      required
                    />
                    {formik.touched.pincode && formik.errors.pincode ? (
                      <div className="text-red-500 mt-1">
                        {formik.errors.pincode}
                      </div>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>

            <div className="payment-box mx-6 hidden lg:block">
              <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 ">
                Payment
              </h5>
              <p className="mb-3 text-sm text-gray-700 ">
                Make payment for the product here
              </p>
              <div className="mt-8">
                <LoadingButton
                  onClick={formik.handleSubmit}
                  loading={btnloading}>
                  Pay Securely
                </LoadingButton>
                {/* <PayButton/> */}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/12 ">
            <div className="flex lg:block justify-center mt-10 lg:mt-0 m-3 ">
              <div className=" p-6 w-full bg-white border border-gray-200 rounded-lg shadow ">
                <a href="#">
                  <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 ">
                    Order details
                  </h5>
                </a>
                <div className="flex justify-between mt-5">
                  <p className="mb-3 font-normal text-gray-700 ">Price</p>
                  <p className="mb-3 font-normal text-gray-700 ">
                    ₹ {courseDetails.price}
                  </p>
                </div>

                <div className="flex justify-between mt-3">
                  <p className="mb-3 font-normal text-gray-700 ">Discount</p>
                  <p className="mb-3 font-normal text-gray-700 ">₹ 0</p>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 "></hr>

                <div className="flex justify-between mt-7">
                  <p className="mb-3 font-normal text-gray-700 ">TOTAL (INR)</p>
                  <p className="mb-3 font-normal text-gray-700 ">
                    ₹ {courseDetails.price}
                  </p>
                </div>

                <div className="flex justify-between mt-2">
                  <p className="mb-3 text-xs text-gray-700 ">NEED HELP?</p>
                </div>

                <div className="mt-5 ">
                  <p className="text-sm text-center my-5">
                    30-Day Money-Back Guarantee
                  </p>
                </div>
              </div>
            </div>

            <div className="payment-box mx-6 block lg:hidden mt-8">
              <h5 className="mb-3 mt-3 text-2xl font-bold tracking-tight text-gray-900 ">
                Payment
              </h5>
              <p className="mb-3 text-sm text-gray-700">
                Make payment for the product here
              </p>
              <div className="mt-8">
                <LoadingButton
                  onClick={formik.handleSubmit}
                  loading={btnloading}>
                  Pay Securely
                </LoadingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderSummary;
