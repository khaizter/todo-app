import "./MainContainer.scss";
import React, { Fragment, useContext } from "react";
import TodoContext from "../../../store/todo-context";
import { AnimatePresence, motion } from "framer-motion";

const MainContainer = ({ children }) => {
  const todoCtx = useContext(TodoContext);

  return (
    <div className={`main-container main-container--${todoCtx.theme}-theme`}>
      <AnimatePresence>
        {todoCtx.theme === "dark" && (
          <Fragment>
            <motion.img
              key="mobile"
              src={`./images/bg-mobile-dark.jpg`}
              aria-hidden={true}
              className="main-container__background main-container__background--mobile"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              key="desktop"
              src={`./images/bg-desktop-dark.jpg`}
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
              src={`./images/bg-mobile-light.jpg`}
              aria-hidden={true}
              className="main-container__background main-container__background--mobile"
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <motion.img
              key="desktop"
              src={`./images/bg-desktop-light.jpg`}
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
