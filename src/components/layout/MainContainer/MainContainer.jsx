import "./MainContainer.scss";
import React, { Fragment, useContext } from "react";
import TodoContext from "../../../store/todo-context";
import { AnimatePresence, motion } from "framer-motion";
import darkMobileImage from "../../../images/bg-mobile-dark.jpg";
import lightMobileImage from "../../../images/bg-mobile-light.jpg";
import darkDesktopImage from "../../../images/bg-desktop-dark.jpg";
import lightDesktopImage from "../../../images/bg-desktop-light.jpg";

const MainContainer = ({ children }) => {
  const todoCtx = useContext(TodoContext);

  return (
    <div className={`main-container main-container--${todoCtx.theme}-theme`}>
      <AnimatePresence>
        {todoCtx.theme === "dark" && (
          <Fragment>
            <motion.img
              key="mobile"
              src={darkMobileImage}
              aria-hidden={true}
              className="main-container__background main-container__background--mobile"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              key="desktop"
              src={darkDesktopImage}
              aria-hidden={true}
              className="main-container__background main-container__background--desktop"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Fragment>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {todoCtx.theme === "light" && (
          <Fragment>
            <motion.img
              key="mobile"
              src={lightMobileImage}
              aria-hidden={true}
              className="main-container__background main-container__background--mobile"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              key="desktop"
              src={lightDesktopImage}
              aria-hidden={true}
              className="main-container__background main-container__background--desktop"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
          </Fragment>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

export default MainContainer;
