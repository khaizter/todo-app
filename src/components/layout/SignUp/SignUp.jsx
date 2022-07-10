import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../../../store/todo-context";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import CustomInput from "../CustomInput/CustomInput";

import "./SignUp.scss";
import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

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

const SignUp = () => {
  const todoCtx = useContext(TodoContext);
  const [isNameActive, setIsNameActive] = useState(false);

  const submitHandler = (values, actions) => {
    const formData = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    console.log(formData);
    todoCtx.signup(formData, actions.setErrors);
  };

  return (
    <main className="signup">
      <h1 className="signup__title">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form className="signup__form" autoComplete="off" novalidate>
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
    </main>
  );
};

export default SignUp;
