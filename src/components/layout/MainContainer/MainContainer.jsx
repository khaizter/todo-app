import "./MainContainer.scss";
import React, { useContext } from "react";
import TodoContext from "../../../store/todo-context";

const MainContainer = ({ children }) => {
  const todoCtx = useContext(TodoContext);

  return (
    <div className={`main-container main-container--${todoCtx.theme}-theme`}>
      <img
        src={`./images/bg-mobile-${todoCtx.theme}.jpg`}
        aria-hidden={true}
        className="main-container__background main-container__background--mobile"
      />
      <img
        src={`./images/bg-desktop-${todoCtx.theme}.jpg`}
        aria-hidden={true}
        className="main-container__background main-container__background--desktop"
      />

      {children}
    </div>
  );
};

export default MainContainer;
