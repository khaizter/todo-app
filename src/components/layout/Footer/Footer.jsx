import "./Footer.scss";
import React from "react";
import { useSelector } from "react-redux";

const Footer = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  return (
    <footer className={`footer footer--${currentTheme}-theme`}>
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
