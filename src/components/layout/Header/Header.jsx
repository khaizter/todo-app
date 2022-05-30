import "./Header.scss";
import React, { useContext } from "react";
import SunIcon from "../../icon/SunIcon";
import TodoContext from "../../../store/todo-context";
import MoonIcon from "../../icon/MoonIcon";

const Header = () => {
  const todoCtx = useContext(TodoContext);
  return (
    <header className="header">
      <h1 className="header__title">TODO</h1>
      <button className="header__toggle-theme" onClick={todoCtx.toggleTheme}>
        {todoCtx.theme === "dark" && <SunIcon />}
        {todoCtx.theme === "light" && <MoonIcon />}
      </button>
    </header>
  );
};

export default Header;
