import "./TodoFilter.scss";
import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { setFilter } from "../../../store/todo";
import { clearComplete } from "../../../store/todo";

const TodoFilter = () => {
  const currentFilter = useSelector((state) => state.todo.filter);
  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const activeItemsLeft = useSelector((state) => {
    return state.todo.items.filter((item) => item.status === "in progress")
      .length;
  });

  const setFilterAll = () => {
    dispatch(setFilter("all"));
  };

  const setFilterInProgress = () => {
    dispatch(setFilter("in progress"));
  };

  const setFilterDone = () => {
    dispatch(setFilter("done"));
  };

  const clearCompleteHandler = () => {
    dispatch(clearComplete());
  };

  return (
    <motion.section className="todo-filter">
      <div
        className={`todo-filter__actions todo-filter__actions--${currentTheme}-theme`}
      >
        <span>{activeItemsLeft} items left</span>
        <div className="todo-filter__filters">
          <button
            onClick={setFilterAll}
            className={`todo-filter__filter ${
              currentFilter === "all" ? "todo-filter__filter--active" : ""
            } todo-filter__filter--${currentTheme}-theme`}
          >
            All
          </button>
          <button
            onClick={setFilterInProgress}
            className={`todo-filter__filter ${
              currentFilter === "in progress"
                ? "todo-filter__filter--active"
                : ""
            } todo-filter__filter--${currentTheme}-theme`}
          >
            Active
          </button>
          <button
            onClick={setFilterDone}
            className={`todo-filter__filter ${
              currentFilter === "done" ? "todo-filter__filter--active" : ""
            } todo-filter__filter--${currentTheme}-theme`}
          >
            Complete
          </button>
        </div>
        <button
          className={`todo-filter__clear todo-filter__clear--${currentTheme}-theme`}
          onClick={clearCompleteHandler}
        >
          Clear Completed
        </button>
      </div>
      <div
        className={`todo-filter__filters todo-filter__filters--seperate todo-filter__filters--${currentTheme}-theme`}
      >
        <button
          onClick={setFilterAll}
          className={`todo-filter__filter ${
            currentFilter === "all" ? "todo-filter__filter--active" : ""
          } todo-filter__filter--${currentTheme}-theme`}
        >
          All
        </button>
        <button
          onClick={setFilterInProgress}
          className={`todo-filter__filter ${
            currentFilter === "in progress" ? "todo-filter__filter--active" : ""
          } todo-filter__filter--${currentTheme}-theme`}
        >
          Active
        </button>
        <button
          onClick={setFilterDone}
          className={`todo-filter__filter ${
            currentFilter === "done" ? "todo-filter__filter--active" : ""
          } todo-filter__filter--${currentTheme}-theme`}
        >
          Completed
        </button>
      </div>
    </motion.section>
  );
};

export default TodoFilter;
