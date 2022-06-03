import "./TodoFilter.scss";
import React, { useContext, useState, useEffect } from "react";
import TodoContext from "../../../store/todo-context";
import { motion } from "framer-motion";

const TodoFilter = () => {
  const [filter, setFilter] = useState("all");
  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    todoCtx.setFilter(filter);
  }, [filter]);

  const activeItemsLeft = todoCtx.items.filter(
    (item) => item.status === "active"
  ).length;

  return (
    <motion.section className="todo-filter">
      <div
        className={`todo-filter__actions todo-filter__actions--${todoCtx.theme}-theme`}
      >
        <span>{activeItemsLeft} items left</span>
        <div className="todo-filter__filters">
          <button
            onClick={() => setFilter("all")}
            className={`todo-filter__filter ${
              filter === "all" ? "todo-filter__filter--active" : ""
            } todo-filter__filter--${todoCtx.theme}-theme`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`todo-filter__filter ${
              filter === "active" ? "todo-filter__filter--active" : ""
            } todo-filter__filter--${todoCtx.theme}-theme`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("complete")}
            className={`todo-filter__filter ${
              filter === "complete" ? "todo-filter__filter--active" : ""
            } todo-filter__filter--${todoCtx.theme}-theme`}
          >
            Completed
          </button>
        </div>
        <button
          className={`todo-filter__clear todo-filter__clear--${todoCtx.theme}-theme`}
          onClick={todoCtx.clearComplete}
        >
          Clear Completed
        </button>
      </div>
      <div
        className={`todo-filter__filters todo-filter__filters--seperate todo-filter__filters--${todoCtx.theme}-theme`}
      >
        <button
          onClick={() => setFilter("all")}
          className={`todo-filter__filter ${
            filter === "all" ? "todo-filter__filter--active" : ""
          } todo-filter__filter--${todoCtx.theme}-theme`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`todo-filter__filter ${
            filter === "active" ? "todo-filter__filter--active" : ""
          } todo-filter__filter--${todoCtx.theme}-theme`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("complete")}
          className={`todo-filter__filter ${
            filter === "complete" ? "todo-filter__filter--active" : ""
          } todo-filter__filter--${todoCtx.theme}-theme`}
        >
          Completed
        </button>
      </div>
    </motion.section>
  );
};

export default TodoFilter;
