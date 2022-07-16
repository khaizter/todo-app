import "./Header.scss";
import React, { useEffect, useState } from "react";
import SunIcon from "../../icon/SunIcon";
import MoonIcon from "../../icon/MoonIcon";
import ArrowIcon from "../../icon/ArrowIcon";
import { AnimatePresence, motion } from "framer-motion";
import LogoutIcon from "../../icon/LogoutIcon";
import SaveIcon from "../../icon/SaveIcon";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../../store/theme";
import { signOut } from "../../../store/auth";
import { saveItems } from "../../../store/todo";
import SpinnerIcon from "../../icon/SpinnerIcon";
import CheckIcon from "../../icon/CheckIcon";

const dropDownVariants = {
  hidden: {
    opacity: 0,
    y: -5,
    transition: { ease: "easeInOut", duration: 0.4 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ease: "easeInOut", duration: 0.4 },
  },
};

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const currentTheme = useSelector((state) => state.theme.theme);
  const currentToken = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.name);

  const [isSaveLoading, setIsSaveLoading] = useState(false);

  const [showCheck, setShowCheck] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!showCheck) {
      return;
    }
    const checkTimeout = setTimeout(() => {
      setShowCheck(false);
    }, 1500);

    return () => {
      clearTimeout(checkTimeout);
    };
  }, [showCheck, setShowCheck]);

  const menuToggleHandler = () => {
    setShowMenu((prevState) => !prevState);
  };

  const saveHandler = () => {
    setIsSaveLoading(true);
    dispatch(
      saveItems(() => {
        setIsSaveLoading(false);
        setShowCheck(true);
      })
    );
    setShowMenu(false);
  };

  const logoutHandler = () => {
    dispatch(signOut());
    setShowMenu(false);
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  return (
    <header className={`header header--${currentTheme}-theme`}>
      <motion.h1
        className="header__title"
        initial={{ opacity: 0, y: "1rem" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        TODO
      </motion.h1>
      <div className="header__right">
        <button className="header__toggle-theme" onClick={toggleThemeHandler}>
          <AnimatePresence exitBeforeEnter>
            {currentTheme === "dark" && <SunIcon key="sun" />}
            {currentTheme === "light" && <MoonIcon key="moon" />}
          </AnimatePresence>
        </button>
        {currentToken && (
          <>
            <button onClick={menuToggleHandler} className="header__user">
              <span>{currentUser}</span>
              <ArrowIcon />
              <div className="header__saved">
                {isSaveLoading ? (
                  <>
                    <SaveIcon />
                    <SpinnerIcon className="header__spinner" />
                  </>
                ) : showCheck ? (
                  <>
                    <SaveIcon />
                    <CheckIcon className="header__check" />
                  </>
                ) : (
                  ""
                )}
              </div>
            </button>
            <AnimatePresence>
              {showMenu && (
                <motion.div
                  className={`header__drop-down header__drop-down--${currentTheme}-theme`}
                  variants={dropDownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <button onClick={saveHandler}>
                    <span>Save</span>
                    <SaveIcon />
                  </button>
                  <button onClick={logoutHandler}>
                    <span>Logout</span>
                    <LogoutIcon />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
