import "./TodoCreate.scss";
import React, { useState, useRef } from "react";
import CheckIcon from "../../icon/CheckIcon";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { createTask } from "../../../store/todo";

const todoCreateVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const TodoCreate = () => {
  const [status, setStatus] = useState("in progress");
  const inputRef = useRef();
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const createTodoHandler = () => {
    if (inputRef.current.value.trim() === "") {
      return;
    }

    dispatch(
      createTask({
        task: inputRef.current.value,
        status: status,
      })
    );

    inputRef.current.value = "";
  };

  const toggleStatusHandler = () => {
    setStatus((prevState) => {
      return prevState === "in progress" ? "done" : "in progress";
    });
  };

  return (
    <motion.section
      className={`todo-create todo-create--${currentTheme}-theme`}
      variants={todoCreateVariants}
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <button
        className={`todo-create__bullet ${
          status === "done" ? "todo-create__bullet--complete" : ""
        } todo-create__bullet--${currentTheme}-theme`}
        onClick={toggleStatusHandler}
      >
        <CheckIcon />
      </button>
      <input
        className="todo-create__input"
        type="text"
        placeholder="Create a new todo..."
        ref={inputRef}
        onKeyDown={(e) => e.key === "Enter" && createTodoHandler()}
      />
    </motion.section>
  );
};

export default TodoCreate;
