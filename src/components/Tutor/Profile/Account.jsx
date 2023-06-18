import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import defaultDp from "/assets/tutor/default-dp.png";
import { FiEdit2 } from "react-icons/fi";
import { useFormik } from "formik";
import { getTutorProfile, updateTutorProfile } from "../../../Services/tutorApi";
import { toast } from "react-hot-toast";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Account() {
  const [image, setImage] = useState(null);
  const [tutor, setTutor] = useState(null);

  const initialValues = {
    name: "",
    email: "",
    about: "",
  };

  const imageUpload = async () => {
    const storageRef = ref(storage, "/Tutor-Profile/" + image.name);
    const snapshot = await uploadBytes(storageRef, image);
    return getDownloadURL(snapshot.ref);
  };
  const formik = useFormik({
    initialValues,
    onSubmit: async(values) => {
      toast.loading("Updating ...");
      if (image) {
        const url = await imageUpload();
        values = {
          ...values,
          image: url,
        };
      }
      updateTutorProfile(values).then(({ data }) => {
        setTutor(data.tutor);
        toast.dismiss();
        toast.success(data.message);
      });
    },
  });

  useEffect(() => {
    getTutorProfile()
      .then(({ data }) => {
        setTutor(data.tutor);
        formik.setValues(data.tutor);
      })
      .catch((data) => {
        toast.error(data.message);
      });
  }, []);
  return (
    <div className=" w-full bg-[#141B2D] text-white">
      <NavBar />
      <div className="bg-[#1F2A40] mx-10  rounded-lg">
        <div className="md:flex  no-wrap py-20 px-8">
          <div className="w-full md:w-3/12 md:mx-2 rounded-md h-full">
            <div className="bg-white p-3 rounded-md border-t-4 border-green-400">
              <div className="image overflow-hidden relative">
                {!image ? (
                  <img
                    className="h-48 w-48 object-cover mx-auto rounded-full"
                    src={tutor?.image || defaultDp}
                    alt="Default"
                  />
                ) : (
                  <img
                    className="h-48 w-48 object-cover mx-auto rounded-full"
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                  />
                )}
                <div className="ab bg-green-500 text-xs absolute bottom-1 right-4 font-bold  rounded-full w-10 h-10  text-white flex justify-center items-center   float-left hover:bg-gray-300 hover:text-gray-600  overflow-hidden cursor-pointer">
                  <input
                    type="file"
                    name="photo"
                    className="absolute inset-0  opacity-0 cursor-pointer"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  <FiEdit2 size={14} />
                </div>
              </div>
              <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
                {tutor?.name}
              </h1>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Status</span>
                  {tutor?.status ? (
                    <span className="ml-auto">
                      <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                        Active
                      </span>
                    </span>
                  ) : (
                    <span className="ml-auto">
                      <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">
                        Blocked
                      </span>
                    </span>
                  )}
                </li>
              </ul>
              <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li className="flex items-center py-3">
                  <span>Member since</span>
                  <span className="ml-auto">
                    {tutor?.createdAt.slice(0, 10)}
                  </span>
                </li>
              </ul>
            </div>
            <div className="my-4" />
          </div>

          <div className="w-full md:w-9/12  ">
            <div className="bg-white p-3 shadow-sm rounded-md h-full ">
              <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    className="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span className="tracking-wide">About</span>
              </div>
              <div className="text-gray-700 p-5">
                <form onSubmit={formik.handleSubmit}>
                  <div className="grid md:grid-cols-2 text-sm gap-2">
                    <div className="grid ">
                      <div className=" py-2  font-semibold">Name</div>
                      <input
                        className="mt-2 border-2 h-10 px-4 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                        type="text"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <p className="text-red-500 mt-1">
                          {formik.errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid ">
                      <div className=" py-2  font-semibold">Email</div>
                      <input
                        className="mt-2 border-2 h-10 px-4 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                        type="email"
                        name="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 mt-1">
                          {formik.errors.email}
                        </p>
                      ) : null}
                    </div>

                    <div className="grid mt- ">
                      <div className=" py-2  font-semibold">Phone</div>
                      <input
                        className=" px-4 border-2 h-10 border-gray-300  bg-gray-200  cursor-not-allowed opacity-50 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                        type="text"
                        name="phone"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        onBlur={formik.handleBlur}
                        disabled
                      />
                      {/* <div className="w-8 h-8 text-green-600 border-2 flex justify-center items-center rounded-full border-green-600">
                    <TiTick size={20} />
                  </div> */}
                    </div>
                  </div>
                  <div className="grid ">
                    <div className=" py-2  font-semibold">About</div>
                    <textarea
                      rows="5"
                      className="mt-2 border-2 px-4  border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                      type="text"
                      name="about"
                      onChange={formik.handleChange}
                      value={formik.values.about}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.about && formik.errors.about ? (
                      <p className="text-red-500 mt-1">{formik.errors.about}</p>
                    ) : null}
                  </div>
                  <div className="grid md:grid-cols-2 mt-8">
                    <div className="grid grid-cols-2">
                      <div className=" py-2 font-bold">
                        Total Purchased course :
                      </div>
                      <div className="md:px-4 py-2 font-bold">
                        {tutor?.totalCourses}
                      </div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                <div className="md:px-4 md:py-2 font-semibold">
                  No. Community
                </div>
                <div className="px-4 py-2">{tutor?.community.length}</div>
              </div> */}
                  </div>
                  <div className="flex justify-end mt-5">
                    <button
                      type="submit"
                      className="w-full md:w-32 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
