import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../../../store/todo-context";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./SignUp.scss";

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
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form className="signup__form">
          <div className="signup__form-labels">
            <label htmlFor="name">Name </label>
            <span>
              <ErrorMessage name="name" />
            </span>
          </div>
          <Field type="text" id="name" name="name" />
          <div className="signup__form-labels">
            <label htmlFor="email">E-mail</label>
            <span>
              <ErrorMessage name="email" />
            </span>
          </div>
          <Field type="email" id="email" name="email" />
          <div className="signup__form-labels">
            <label htmlFor="password">Password</label>
            <span>
              <ErrorMessage name="password" />
            </span>
          </div>
          <Field type="password" id="password" name="password" />
          <div className="signup__form-labels">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <span>
              <ErrorMessage name="confirmPassword" />
            </span>
          </div>
          <Field type="password" id="confirmPassword" name="confirmPassword" />
          <button type="submit">Sign Up</button>
        </Form>
      </Formik>
      <Link to="/signin">Already have account</Link>
    </main>
  );
};

export default SignUp;
