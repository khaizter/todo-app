import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import CustomInput from "../CustomInput/CustomInput";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../../store/auth";
import SpinnerIcon from "../../icon/SpinnerIcon";

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

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!setErrors) {
      return;
    }
    setErrors(currentErrors);
  }, [setErrors, currentErrors]);

  const finishLoading = () => {
    setIsLoading(false);
  };

  const submitHandler = (values, actions) => {
    setIsLoading(true);
    const formData = {
      email: values.email,
      password: values.password,
    };
    dispatch(signIn(formData, finishLoading));
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

            <button className="login__submit">
              {isLoading ? <SpinnerIcon /> : "Sign In"}
            </button>
          </Form>
        )}
      </Formik>
      <Link to="/signup">Create account</Link>
    </motion.main>
  );
};

export default Login;
