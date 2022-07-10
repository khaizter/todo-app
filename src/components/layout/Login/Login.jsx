import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../../../store/todo-context";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Login.scss";

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email address"),
  password: Yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const todoCtx = useContext(TodoContext);

  const submitHandler = (values, actions) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    console.log(formData);
    todoCtx.signin(formData, actions.setErrors);
  };

  return (
    <main className="login">
      <h1>Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form className="login__form">
          <div className="login__form-labels">
            <label htmlFor="email">E-mail</label>
            <span>
              <ErrorMessage name="email" />
            </span>
          </div>
          <Field type="email" id="email" name="email" />
          <div className="login__form-labels">
            <label htmlFor="password">Password</label>
            <span>
              <ErrorMessage name="password" />
            </span>
          </div>
          <Field type="password" id="password" name="password" />
          <button>Sign In</button>
        </Form>
      </Formik>
      <Link to="/signup">Create an account</Link>
    </main>
  );
};

export default Login;
