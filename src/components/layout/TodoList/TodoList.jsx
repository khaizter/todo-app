import "./TodoList.scss";
import React, { useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import TodoFilter from "../TodoFilter/TodoFilter";
import TodoContext from "../../../store/todo-context";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { AnimatePresence, motion } from "framer-motion";

const todoListVariants = {
  visible: { opacity: 1, y: 0 },
  hidden: { opacity: 0, y: 50 },
};

const TodoList = () => {
  const todoCtx = useContext(TodoContext);

  const onDragEndHandler = (result) => {
    const sourceItem = todoCtx.filteredItems[result.source.index];
    const destinationItem = todoCtx.filteredItems[result.destination.index];
    todoCtx.reorderItems(sourceItem, destinationItem);
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
      {todoCtx.filteredItems.length ? (
        <DragDropContext onDragEnd={onDragEndHandler}>
          <Droppable droppableId="todo-list">
            {(provided) => (
              <motion.ul
                className={`todo-list__items todo-list__items--${todoCtx.theme}-theme`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <AnimatePresence>
                  {todoCtx.filteredItems.map((item, index) => (
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
          className={`todo-list__empty todo-list__empty--${todoCtx.theme}-theme`}
        >
          The list is empty
        </div>
      )}
      <TodoFilter />
    </motion.section>
  );
};

export default TodoList;
