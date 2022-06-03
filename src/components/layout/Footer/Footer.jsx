import "./Footer.scss";
import React, { useContext } from "react";
import TodoContext from "../../../store/todo-context";

const Footer = () => {
  const todoCtx = useContext(TodoContext);
  return (
    <footer className={`footer footer--${todoCtx.theme}-theme`}>
      <p>
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW"
          className="footer__highlight"
        >
          Frontend Mentor
        </a>
        .
      </p>
      <p>
        Coded by{" "}
        <a href="https://github.com/khaizter" className="footer__highlight">
          Khaizter
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
