import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../../store/auth";

import "./Login.scss";

const validationSchema = Yup.object({
  email: Yup.string().required("Required").email("Invalid email address"),
  password: Yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
};

const mainVariants = {
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.4 } },
  hidden: { opacity: 0, y: 50, transition: { ease: "easeOut", duration: 0.4 } },
  leave: { opacity: 0, transition: { ease: "easeOut", duration: 0.4 } },
};

let setErrors = null;

const Login = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const currentErrors = useSelector((state) => state.error.errors);

  useEffect(() => {
    if (!setErrors) {
      return;
    }
    setErrors(currentErrors);
  }, [setErrors, currentErrors]);

  const submitHandler = (values, actions) => {
    const formData = {
      email: values.email,
      password: values.password,
    };
    console.log(formData);
    dispatch(signIn(formData));
    setErrors = actions.setErrors;
  };

  return (
    <motion.main
      className={`login login--${currentTheme}-theme`}
      variants={mainVariants}
      initial="hidden"
      animate="visible"
      exit="leave"
    >
      <h1 className="login__title">Sign In</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        {(props) => (
          <Form className="login__form" autoComplete="off">
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
    </motion.main>
  );
};

export default Login;
