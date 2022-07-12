import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Todo from "../layout/Todo/Todo";
import Login from "../layout/Login/Login";
import SignUp from "../layout/SignUp/SignUp";
import { AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const MainRouter = () => {
  const currentToken = useSelector((state) => state.auth.token);
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {currentToken && (
          <>
            <Route path="todo" element={<Todo />} />
            <Route path="*" element={<Navigate to="todo" />} />
          </>
        )}
        {!currentToken && (
          <>
            <Route path="signin" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="signin" />} />
          </>
        )}
      </Routes>
    </AnimatePresence>
  );
};

export default MainRouter;
