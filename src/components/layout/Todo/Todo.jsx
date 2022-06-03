import "./Todo.scss";
import React, { useContext } from "react";
import TodoCreate from "../TodoCreate/TodoCreate";
import TodoList from "../TodoList/TodoList";
import TodoContext from "../../../store/todo-context";
import { motion } from "framer-motion";

const mainTodoVariants = {
  visible: { transition: { staggerChildren: 0.5 } },
  hidden: { transition: { staggerChildren: 0.5 } },
};

const dragTextVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const Todo = () => {
  const todoCtx = useContext(TodoContext);
  return (
    <motion.main
      className={`todo todo--${todoCtx.theme}-theme`}
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
