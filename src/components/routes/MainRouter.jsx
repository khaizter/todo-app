import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Todo from "../layout/Todo/Todo";
import Login from "../layout/Login/Login";
import SignUp from "../layout/SignUp/SignUp";
import { useContext } from "react";
import TodoContext from "../../store/todo-context";

const MainRouter = () => {
  const todoCtx = useContext(TodoContext);

  return (
    <Routes>
      {todoCtx.userToken && (
        <>
          <Route path="todo" element={<Todo />} />
          <Route path="*" element={<Navigate to="todo" />} />
        </>
      )}
      {!todoCtx.userToken && (
        <>
          <Route path="signin" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="signin" />} />
        </>
      )}
    </Routes>
  );
};

export default MainRouter;
