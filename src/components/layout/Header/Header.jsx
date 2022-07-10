import "./Header.scss";
import React, { useContext } from "react";
import SunIcon from "../../icon/SunIcon";
import TodoContext from "../../../store/todo-context";
import MoonIcon from "../../icon/MoonIcon";
import ArrowIcon from "../../icon/ArrowIcon";
import { AnimatePresence, motion } from "framer-motion";

const Header = () => {
  const todoCtx = useContext(TodoContext);

  const logoutHandler = () => {
    todoCtx.logout();
  };

  return (
    <header className="header">
      <motion.h1
        className="header__title"
        initial={{ opacity: 0, y: "1rem" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        TODO
      </motion.h1>
      <div className="header__right">
        <button className="header__toggle-theme" onClick={todoCtx.toggleTheme}>
          <AnimatePresence exitBeforeEnter>
            {todoCtx.theme === "dark" && <SunIcon key="sun" />}
            {todoCtx.theme === "light" && <MoonIcon key="moon" />}
          </AnimatePresence>
        </button>
        {todoCtx.userToken && (
          <button onClick={logoutHandler} className="header__user">
            <span>{todoCtx.currentUser}</span>
            <ArrowIcon />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
