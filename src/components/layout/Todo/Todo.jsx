import React from "react";
import TodoCreate from "../TodoCreate/TodoCreate";
import TodoList from "../TodoList/TodoList";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

import "./Todo.scss";

const mainTodoVariants = {
  visible: { transition: { staggerChildren: 0.5 } },
  hidden: { transition: { staggerChildren: 0.5 } },
};

const dragTextVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const Todo = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  return (
    <motion.main
      className={`todo todo--${currentTheme}-theme`}
      variants={mainTodoVariants}
      initial="hidden"
      animate="visible"
    >
      <TodoCreate />
      <TodoList />
      <motion.section
        className="todo__drag-text"
        variants={dragTextVariants}
        transition={{ ease: "easeOut", duration: 0.5 }}
      >
        Drag and drop to reorder list
      </motion.section>
    </motion.main>
  );
};

export default Todo;
