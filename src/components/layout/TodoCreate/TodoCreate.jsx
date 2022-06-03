import "./TodoCreate.scss";
import React, { useState, useRef, useContext } from "react";
import CheckIcon from "../../icon/CheckIcon";
import TodoContext from "../../../store/todo-context";
import { motion } from "framer-motion";

const todoCreateVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const TodoCreate = () => {
  const [status, setStatus] = useState("active");
  const inputRef = useRef();
  const todoCtx = useContext(TodoContext);

  const createTodoHandler = () => {
    todoCtx.createTodo({
      id: Math.random().toString(),
      status: status,
      todo: inputRef.current.value,
    });

    inputRef.current.value = "";
  };

  const toggleStatusHandler = () => {
    setStatus((prevState) => {
      return prevState === "active" ? "complete" : "active";
    });
  };

  return (
    <motion.section
      className={`todo-create todo-create--${todoCtx.theme}-theme`}
      variants={todoCreateVariants}
      transition={{ ease: "easeOut", duration: 0.5 }}
    >
      <button
        className={`todo-create__bullet ${
          status === "complete" ? "todo-create__bullet--complete" : ""
        } todo-create__bullet--${todoCtx.theme}-theme`}
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
