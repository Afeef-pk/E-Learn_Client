import * as Yup from "yup";

export const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

export const validationSchema = Yup.object({
    firstName: Yup.string().matches(/^[a-zA-Z ]*$/, 'Name must be a letter').min(2).max(25).required("Please enter your name"),
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