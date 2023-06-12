import * as Yup from "yup";

export const initialValues = {
  name: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
};

export const validationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z ]*$/, 'Name must be a letter').min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .required("Please enter your phone"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const loginInitialValues = {
  email: "",
  password: "",
};

export const loginValidationSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please enter your password"),
});

export const tutorInitialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  about: "",
  otp: "",
};

export const tutorValidationSchema = Yup.object({
  name: Yup.string().matches(/^[a-zA-Z ]*$/, 'Name must be a letter').min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number is not valid")
    .required("Please enter your phone"),
  password: Yup.string().min(6).required("Please enter your password"),
  about: Yup.string().min(10).max(500).required("Please fill your details"),
});

export const userProfileValidationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[a-zA-Z ]*$/, "Name must be a letter")
    .min(2)
    .max(15)
    .required("Please enter your name"),
  lastName: Yup.string()
    .min(1)
    .max(15)
    .required("Please enter your last name"),
  email: Yup.string().email().required("Please enter your email"),
});

export const changePassInitialValues = {
  oldPassword:"",
  newPassword: "",
  confirmPassword: "",
}

export const ChangePassvalidationSchema = Yup.object({
  oldPassword: Yup.string().min(6).required("Please enter your old password"),
  newPassword: Yup.string().min(6).required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const course = [
  {
      "chapter": "Getting started with React",
      "lessons": [
          {
              "chapterName": "Getting started with React",
              "lessonName": "Welcome to new React course"
          }
      ],
  },
  {
      "chapter": "Basics of to React",
      "lessons": [
          {
              "chapterName": "Basics of to React",
              "lessonName": "Map and arrow function in javascript"
          },
          {
              "chapterName": "Basics of to React",
              "lessonName": "functional components"
          },
          {
              "chapterName": "Basics of to React",
              "lessonName": "Hook's concepts"
          }
      ],
  },
  {
      "chapter": "Components in React",
      "lessons": [
          {
              "chapterName": "Components in React",
              "lessonName": "Class & functional componets"
          }
      ],
  }
]
export const courseInitialValues = {
  name: "",
  about: "",
  duration: "",
  language: "",
  price: "",
  category: "",
  description: "",
};

export const courseValidationSchema = Yup.object({
  name: Yup.string().min(4).max(40).required("Please enter Course name"),
  about: Yup.string().min(5).max(500).required("enter short description"),
  duration: Yup.string().required("Please enter course duration"),
  language: Yup.string().required("Please enter course language"),
  price: Yup.number().required("Please enter course price"),
  description: Yup.string().required("Write description about the course"),
});