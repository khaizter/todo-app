import "./TodoItem.scss";
import React, { useContext } from "react";
import CheckIcon from "../../icon/CheckIcon";
import CrossIcon from "../../icon/CrossIcon";
import TodoContext from "../../../store/todo-context";
import { Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";

const itemVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const TodoItem = ({ item, index }) => {
  const { status, todo } = item;
  const todoCtx = useContext(TodoContext);

  const toggleStatus = () => {
    todoCtx.toggleTodoStatus(item.id);
  };

  const deleteHandler = () => {
    todoCtx.deleteTodo(item.id);
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <motion.li
          className={`todo-item ${
            snapshot.isDragging ? "todo-item--dragging" : ""
          } todo-item--${todoCtx.theme}-theme`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <button
            className={`todo-item__status ${
              status === "complete" ? "todo-item__status--complete" : ""
            } todo-item__status--${todoCtx.theme}-theme`}
            onClick={toggleStatus}
          >
            <CheckIcon />
          </button>
          <span
            className={`todo-item__todo ${
              status === "complete" ? "todo-item__todo--complete" : ""
            } todo-item__todo--${todoCtx.theme}-theme`}
          >
            {todo}
          </span>
          <button
            className={`todo-item__delete todo-item__delete--${todoCtx.theme}-theme`}
            onClick={deleteHandler}
          >
            <CrossIcon />
          </button>
        </motion.li>
      )}
    </Draggable>
  );
};

export default TodoItem;
