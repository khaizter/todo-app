import "./Todo.scss";
import React, { useContext } from "react";
import TodoCreate from "../TodoCreate/TodoCreate";
import TodoList from "../TodoList/TodoList";
import TodoContext from "../../../store/todo-context";

const Todo = () => {
  const todoCtx = useContext(TodoContext);
  return (
    <main className={`todo todo--${todoCtx.theme}-theme`}>
      <TodoCreate />
      <TodoList />
      <section className="todo__drag-text">
        Drag and drop to reorder list
      </section>
    </main>
  );
};

export default Todo;
