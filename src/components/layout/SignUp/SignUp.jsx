import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { signUp } from "../../../store/auth";

import "./SignUp.scss";
import { useEffect } from "react";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .matches(/^[a-zA-Z0-9\s]*$/, "No special characters")
    .max(15, "Must be 15 characters or less"),
  email: Yup.string().required("Required").email("Invalid email address"),
  password: Yup.string()
    .required("Required")
    .min(4, "Must be (4-15) characters")
    .max(15, "Must be (4-15) characters"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const mainVariants = {
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
  hidden: { opacity: 0, y: 50, transition: { ease: "easeOut", duration: 0.4 } },
  leave: { opacity: 0, transition: { ease: "easeOut", duration: 0.4 } },
};

let setErrors = null;

const SignUp = () => {
  const currentErrors = useSelector((state) => state.error.errors);
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setErrors) {
      return;
    }
    setErrors(currentErrors);
  }, [setErrors, currentErrors]);

  const submitHandler = (values, actions) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    console.log(formData);
    dispatch(signUp(formData));
    setErrors = actions.setErrors;
  };

  return (
    <motion.main
      className={`signup signup--${currentTheme}-theme`}
      variants={mainVariants}
      initial="hidden"
      animate="visible"
      exit="leave"
    >
      <h1 className="signup__title">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form className="signup__form" autoComplete="off">
            <CustomInput
              formikProps={props}
              type="text"
              name="name"
              label="Name"
            />
            <CustomInput
              formikProps={props}
              type="email"
              name="email"
              label="E-mail"
            />
            <CustomInput
              formikProps={props}
              type="password"
              name="password"
              label="Password"
              togglePassword={true}
            />
            <CustomInput
              formikProps={props}
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <button type="submit" className="signup__submit">
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/signin">Already have an account?</Link>
    </motion.main>
  );
};

export default SignUp;
