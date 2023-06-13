import React, { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { TiTick } from "react-icons/ti";
import { useFormik } from "formik";
import { getUserDetails, updateUserDetails } from "../../../Services/userApi";
import { toast } from "react-hot-toast";
import { storage } from "../../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import defaultDp from "/assets/tutor/default-dp.png";
import { initialValues,userProfileValidationSchema } from "../../../constants/constant";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const imageUpload = async () => {
    const storageRef = ref(storage, "/user-Profile/" + image.name);
    const snapshot = await uploadBytes(storageRef, image);
    return getDownloadURL(snapshot.ref);
  };

  const formik = useFormik({
    initialValues,
    validationSchema:userProfileValidationSchema,
    onSubmit: async (values) => {
      toast.loading("Updating ...");
      if (image) {
        const url = await imageUpload();
        values = {
          ...values,
          image: url,
        };
      }
      await updateUserDetails(values).then(({ data }) => {
        setUser(data.user);
        toast.dismiss();
        toast.success(data.message);
      });
    },
  });

  useEffect(() => {
    getUserDetails().then(({ data }) => {
      setUser(data.user);
      initialValues.name = data.user.name;
      initialValues.lastName = data.user.lastName;
      initialValues.email = data.user.email;
      initialValues.phone = data.user.phone||''
    });
  }, []);

  return (
    <div className="md:flex  no-wrap md:-mx-2 ">
      <div className="w-full md:w-3/12 md:mx-2 rounded-md h-full">
        <div className="bg-white p-3 rounded-md border-t-4 border-green-400">
          <div className="image overflow-hidden relative">
            {!image ? (
              <img
                className="h-48 w-48 object-cover mx-auto rounded-full"
                src={user?.image || defaultDp}
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
            {user?.name}
          </h1>
          <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
            <li className="flex items-center py-3">
              <span>Status</span>
              {user?.status ? (
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
              <span className="ml-auto">{user?.createdAt.slice(0, 10)}</span>
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
                  <div className=" py-2  font-semibold">First Name</div>
                  <input
                    className="mt-2 border-2 h-10 px-4 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="firstName"
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
                  <div className=" py-2  font-semibold">Last Name</div>
                  <input
                    className="mt-2 border-2 h-10 px-4 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="lastName"
                    onChange={formik.handleChange}
                    value={formik.values.lastName}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <p className="text-red-500 mt-1">
                      {formik.errors.lastName}
                    </p>
                  ) : null}
                </div>

                <div className="grid ">
                  <div className=" py-2  font-semibold">Email</div>
                  <input
                    className="mt-2 border-2 px-4 h-10 border-gray-200   block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
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
                    className="mt-2 px-4 border-2 h-10 border-gray-300  bg-gray-200   opacity-50 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500"
                    type="text"
                    name="phone"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    onBlur={formik.handleBlur}
                     disabled={!user?.loginwithgoogle}
                  />
                  {/* <div className="w-8 h-8 text-green-600 border-2 flex justify-center items-center rounded-full border-green-600">
                    <TiTick size={20} />
                  </div> */}
                </div>
              </div>

              <div className="grid md:grid-cols-2 mt-8">
                <div className="grid grid-cols-2">
                  <div className=" py-2 font-semibold">
                    Total Purchased course
                  </div>
                  <div className="md:px-4 py-2">{user?.totalPurchased}</div>
                </div>
                {/* <div className="grid grid-cols-2">
                <div className="md:px-4 md:py-2 font-semibold">
                  No. Community
                </div>
                <div className="px-4 py-2">{user?.community.length}</div>
              </div> */}
              </div>
              <div className="flex justify-end mt-5">
                <button
                  type="submit"
                  className="w-full md:w-32 text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
