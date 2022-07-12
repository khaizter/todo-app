import React, { useState } from "react";
import { ErrorMessage } from "formik";
import EyeIcon from "../../icon/EyeIcon";
import EyeSlashIcon from "../../icon/EyeSlashIcon";
import { useSelector } from "react-redux";

import "./CustomInput.scss";
const CustomInput = ({ formikProps, type, name, label, togglePassword }) => {
  // for password
  const [currentType, setCurrentType] = useState(type);
  const currentTheme = useSelector((state) => state.theme.theme);

  const showPassHandler = (e) => {
    if (!togglePassword) {
      return;
    }
    if (currentType === type) {
      setCurrentType("text");
    } else {
      setCurrentType("password");
    }
  };

  return (
    <div className={`custom-input custom-input--${currentTheme}-theme`}>
      <input
        type={currentType}
        id={name}
        name={name}
        {...formikProps.getFieldProps(name)}
        className="custom-input__input"
      />
      <label
        htmlFor={name}
        className="custom-input__label"
        empty={formikProps.values[name] !== "" ? "false" : "true"}
      >
        {label}
      </label>
      <p className={`custom-input__error`}>
        <ErrorMessage name={name} />
      </p>
      {togglePassword && (
        <button
          type="button"
          className="custom-input__show-password"
          onClick={showPassHandler}
        >
          {currentType === "text" && <EyeSlashIcon />}
          {currentType === "password" && <EyeIcon />}
        </button>
      )}
    </div>
  );
};

export default CustomInput;
