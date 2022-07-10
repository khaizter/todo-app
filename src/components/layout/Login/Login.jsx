import React, { useRef, useContext } from "react";
import { Link } from "react-router-dom";
import TodoContext from "../../../store/todo-context";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

import "./Login.scss";
import CustomInput from "../CustomInput/CustomInput";

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
      <h1 className="login__title">Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form className="login__form" autoComplete="off" novalidate>
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

            <button className="login__submit">Sign In</button>
          </Form>
        )}
      </Formik>
      <Link to="/signup">Create account</Link>
    </main>
  );
};

export default Login;
