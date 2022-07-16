import "./TodoList.scss";
import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import TodoFilter from "../TodoFilter/TodoFilter";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { fetchItems } from "../../../store/todo";
import { useEffect } from "react";
import { reorderItems } from "../../../store/todo";

const todoListVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const TodoList = () => {
  const currentTheme = useSelector((state) => state.theme.theme);
  const filteredItems = useSelector((state) => {
    return state.todo.filter === "all"
      ? state.todo.items
      : state.todo.items.filter((item) => item.status === state.todo.filter);
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchItems());
  }, []);

  const onDragEndHandler = (result) => {
    const sourceItem = filteredItems[result.source.index];
    const destinationItem = filteredItems[result.destination.index];
    dispatch(
      reorderItems({
        source: sourceItem,
        destination: destinationItem,
      })
    );
  };

  return (
    <motion.section
      className="todo-list"
      variants={todoListVariants}
      transition={{
        ease: "easeOut",
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      }}
    >
      {filteredItems.length ? (
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <motion.ul
                className={`todo-list__items todo-list__items--${currentTheme}-theme`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <AnimatePresence>
                  {filteredItems.map((item, index) => (
                    <TodoItem key={item._id} item={item} index={index} />
                  ))}
                </AnimatePresence>
                {provided.placeholder}
              </motion.ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div
          className={`todo-list__empty todo-list__empty--${currentTheme}-theme`}
        >
          The list is empty
        </div>
      )}
      <TodoFilter />
    </motion.section>
  );
};

export default TodoList;
